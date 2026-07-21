$file = "src\components\sections\CinematicTestimonials.tsx"
$text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$enc1256 = [System.Text.Encoding]::GetEncoding(1256)
$bytes = $enc1256.GetBytes($text)
[System.IO.File]::WriteAllBytes("test_restore.tsx", $bytes)
