export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCount, setShowCount] = useState(0);
  const maxShows = 3; // Only show 3 times total

  useEffect(() => {
    if (showCount >= maxShows) return; // Stop after 3 shows

    // First appearance after 10 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      setShowCount(1);
    }, 10000);

    // Rotate every 20 seconds, max 3 times
    const interval = setInterval(() => {
      if (showCount >= maxShows - 1) {
        clearInterval(interval);
        return;
      }
      
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
        setShowCount(prev => prev + 1);
      }, 500);
    }, 20000); // Every 20 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showCount]);