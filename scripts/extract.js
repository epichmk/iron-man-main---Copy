/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, '..', '..', 'videos for frames');
const publicDir = path.join(__dirname, '..', 'public');
const dataFile = path.join(__dirname, '..', 'src', 'lib', 'cinematicData.json');

const videoFiles = [
  'other full bleed background options (1).mp4',
  'other full bleed background options (2).mp4',
  'other full bleed background options (3).mp4',
  'other full bleed background options (4).mp4'
];

const cinematicConfigs = [];

videoFiles.forEach((file, index) => {
  const num = index + 1;
  const videoPath = path.join(videosDir, file);
  const outFolder = path.join(publicDir, `cinematic-${num}`);
  
  if (!fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder, { recursive: true });
  } else {
    // Clean directory
    fs.readdirSync(outFolder).forEach(f => fs.unlinkSync(path.join(outFolder, f)));
  }

  console.log(`Processing video ${num}: ${file}...`);
  try {
    // Extract frames at 24 fps, scaled to 1920px width (maintain aspect ratio), with quality 5
    const ffmpegPath = "C:\\Users\\PC\\ffmpeg\\ffmpeg.exe";
    execSync(`"${ffmpegPath}" -i "${videoPath}" -vf "fps=24,scale=1920:-1" -q:v 5 "${outFolder}/frame_%04d.jpg"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error processing video ${num}:`, err.message);
  }

  // Count extracted frames
  const frames = fs.readdirSync(outFolder).filter(f => f.endsWith('.jpg')).length;
  console.log(`Extracted ${frames} frames for cinematic-${num}`);

  cinematicConfigs.push({
    id: `cinematic-${num}`,
    folder: `cinematic-${num}`,
    frameCount: frames,
    title: `Section ${num}`,
    subtitle: `Video ${num}`,
  });
});

fs.writeFileSync(dataFile, JSON.stringify(cinematicConfigs, null, 2));
console.log('Finished extraction and created cinematicData.json');
