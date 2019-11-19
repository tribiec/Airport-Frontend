const scriptLoader = (callback,url) => {
    const existingScript = document.getElementById('stripe');

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = url;
        script.id = 'stripe';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    } else {
        callback();
    }
};

export default scriptLoader;