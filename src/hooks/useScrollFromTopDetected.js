import {
    useState,
    useEffect
} from 'react'

export default function useScrollFromTopDetected() {
    const [isPastTop, setIsPastTop] = useState(true);

    const isBrowser = typeof window !== "undefined";

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsPastTop(true);
        } else {
            setIsPastTop(false);
        }
    }

    useEffect(() => {
        if(isBrowser) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isBrowser]);

    if (!isBrowser) {
        return false;
    }
    return isPastTop
}
