import {
    useState,
    useEffect
} from 'react'

export default function useScrollFromTopDetected() {
    const [isPastTop, setIsPastTop] = useState(false);

    const isBrowser = typeof window !== "undefined";

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsPastTop(true);
        } else if(window.screenY === 0) {
            setIsPastTop(false);
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
