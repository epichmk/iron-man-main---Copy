$files = Get-ChildItem -Path "public\*.mp4" -Exclude "*.original.mp4"

foreach ($file in $files) {
    $originalPath = $file.FullName -replace '\.mp4$', '.original.mp4'
    
    # If the original backup doesn't exist, rename current to backup
    if (-not (Test-Path $originalPath)) {
        Write-Host "Backing up $($file.Name) to $($file.Name -replace '\.mp4$', '.original.mp4')"
        Rename-Item -Path $file.FullName -NewName $originalPath
    }

    $source = $originalPath
    $target = $file.FullName

    Write-Host "Compressing $($file.Name)..."
    
    # Scrubbing videos require frequent keyframes and no B-frames for smooth JS timeline scrubbing
    if ($file.Name -match "scrub") {
        ffmpeg -hide_banner -loglevel error -i "$source" -vf "scale=-2:1080" -vcodec libx264 -preset fast -crf 26 -g 12 -bf 0 -an -y "$target"
    } else {
        # Standard autoplay background videos
        ffmpeg -hide_banner -loglevel error -i "$source" -vf "scale=-2:1080" -vcodec libx264 -preset fast -crf 28 -an -y "$target"
    }
}

Write-Host "Done! All videos compressed."
