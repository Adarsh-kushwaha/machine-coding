import { useEffect } from "react";

export const useIntersectionObserver = ({ targetRef, onIntersect, options = {}, enabled = true }) => {
    useEffect(() => {
        //this prevent IO calling multiple times
        if (!enabled || !targetRef.current) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                onIntersect();
            }
        }, options);

        const currentTarget = targetRef.current;
        observer.observe(currentTarget);

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
            observer.disconnect();
        };
    }, [targetRef, onIntersect, enabled, options.root, options.rootMargin, options.threshold]);
};
