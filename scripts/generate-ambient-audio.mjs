import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sampleRate = 16000;
const duration = 18;
const samples = sampleRate * duration;
const pcm = Buffer.alloc(samples * 2);
const progression = [
  [196, 246.94, 293.66],
  [174.61, 220, 261.63],
  [146.83, 196, 246.94],
];

function envelope(time, start, length) {
  const local = time - start;
  if (local < 0 || local > length) return 0;
  return Math.min(1, local / 0.04) * Math.exp(-local * 2.2);
}

for (let i = 0; i < samples; i += 1) {
  const time = i / sampleRate;
  const chord = progression[Math.floor(time / 6) % progression.length];
  const fade = Math.min(1, time / 1.5, (duration - time) / 1.5);
  let value = 0;

  chord.forEach((frequency, index) => {
    value += Math.sin(2 * Math.PI * frequency * time + index * 0.7) * 0.035;
    value += Math.sin(2 * Math.PI * frequency * 0.5 * time) * 0.02;
  });

  for (let beat = 0; beat < duration; beat += 2) {
    const note = chord[(beat / 2) % chord.length];
    const env = envelope(time, beat + 0.35, 1.8);
    value += Math.sin(2 * Math.PI * note * 2 * (time - beat)) * env * 0.09;
    value += Math.sin(2 * Math.PI * note * 4.01 * (time - beat)) * env * 0.025;
  }

  const sample = Math.max(-1, Math.min(1, value * fade));
  pcm.writeInt16LE(Math.round(sample * 32767), i * 2);
}

const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + pcm.length, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(sampleRate, 24);
header.writeUInt32LE(sampleRate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(pcm.length, 40);

const outputDirectory = path.resolve('frontend/public/audio');
await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, 'small-hellos.wav'), Buffer.concat([header, pcm]));
console.log('Generated frontend/public/audio/small-hellos.wav');
