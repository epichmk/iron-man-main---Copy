import re

with open('src/components/ui/ScrollToTop.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_scroll = '''    const handleScroll = () => {
      // Check if we reached the absolute bottom (footer)
      const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 150;
      
      if (isAtBottom) {
        setDirection("up");
      } else {
        setDirection("down");
      }
      setIsVisible(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setIsVisible(false), 2500);
    };'''

new_scroll = '''    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we reached the absolute bottom (footer)
      const isAtBottom = currentScrollY + window.innerHeight >= document.documentElement.scrollHeight - 150;
      
      if (isAtBottom) {
        setDirection("up");
      } else if (currentScrollY < lastScrollY.current - 10) {
        // User is scrolling UP (with a small 10px buffer to prevent jitter)
        setDirection("up");
      } else if (currentScrollY > lastScrollY.current + 10) {
        // User is scrolling DOWN
        setDirection("down");
      }
      
      lastScrollY.current = currentScrollY;
      
      setIsVisible(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setIsVisible(false), 2500);
    };'''

content = content.replace(old_scroll, new_scroll)

with open('src/components/ui/ScrollToTop.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Scroll direction logic fixed!")
