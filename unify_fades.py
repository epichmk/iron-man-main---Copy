import os
import re

dir_path = r'c:\Users\PC\Documents\iroooooooonman\iron-man-main\src\components\sections'

for filename in os.listdir(dir_path):
    if filename.endswith('.tsx'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Unify Bottom Fades
        content = re.sub(
            r'className="absolute inset-x-0 bottom-0 h-\[[^\]]+\] bg-gradient-to-t from-\[var\(--page-bg\)\][^"]*"',
            r'className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent pointer-events-none z-10"',
            content
        )
        content = re.sub(
            r'className="absolute bottom-0 inset-x-0 h-[^ ]+ bg-gradient-to-t from-\[var\(--page-bg\)\][^"]*"',
            r'className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent pointer-events-none z-10"',
            content
        )
        content = re.sub(
            r'className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-\[var\(--page-bg\)\][^"]*"',
            r'className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent pointer-events-none z-10"',
            content
        )

        # Unify Top Fades
        content = re.sub(
            r'className="absolute inset-x-0 top-0 h-\[[^\]]+\] bg-gradient-to-b from-\[var\(--page-bg\)\][^"]*"',
            r'className="absolute inset-x-0 top-0 h-[15vh] bg-gradient-to-b from-[var(--page-bg)] via-[var(--page-bg)]/60 to-transparent pointer-events-none z-10"',
            content
        )
        content = re.sub(
            r'className="absolute top-0 inset-x-0 h-[^ ]+ bg-gradient-to-b from-\[var\(--page-bg\)\][^"]*"',
            r'className="absolute inset-x-0 top-0 h-[15vh] bg-gradient-to-b from-[var(--page-bg)] via-[var(--page-bg)]/60 to-transparent pointer-events-none z-10"',
            content
        )
        content = re.sub(
            r'className="absolute top-0 left-0 w-full h-\[[^\]]+\] bg-gradient-to-b from-\[var\(--page-bg\)\][^"]*"',
            r'className="absolute inset-x-0 top-0 h-[15vh] bg-gradient-to-b from-[var(--page-bg)] via-[var(--page-bg)]/60 to-transparent pointer-events-none z-10"',
            content
        )
        content = re.sub(
            r'className="absolute bottom-0 left-0 w-full h-\[[^\]]+\] bg-gradient-to-t from-\[var\(--page-bg\)\][^"]*"',
            r'className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent pointer-events-none z-10"',
            content
        )

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filename}")
