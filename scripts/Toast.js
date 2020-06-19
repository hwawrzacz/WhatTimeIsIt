class Toast {
    toast;
    timeout;

    constructor() {
        this.toast = document.querySelector('.toast');
        this.toastButton = this.toast.querySelector('button');
        this.addButtonlistener();
    }

    set toastMessage(value) {
        const message = this.toast.querySelector('.message');
        message.innerHTML = value;
    }

    addButtonlistener() {
        const handleButtonClick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            clearTimeout(this.timeout);
            this.hideToast();
        }

        this.toastButton.addEventListener('click', handleButtonClick);
    }

    showToastSuccess() {
        this.toastMessage = 'Dobrze!';
        this.showToast();
        this.toast.classList.add('success');
        this.toast.classList.remove('error');
        this.toast.classList.remove('almost');
        this.toast.classList.remove('failure');
        this.timeout = setTimeout(this.hideToast, 3000);
    }

    showToastAlmost(message) {
        // Calculate optimal timeout based on message length assuming 500 ms per word.
        const timeout = message.split(' ').length * 500;

        this.toastMessage = message;
        this.showToast();
        this.toast.classList.add('almost');
        this.toast.classList.remove('error');
        this.toast.classList.remove('success');
        this.toast.classList.remove('failure');
        this.timeout = setTimeout(this.hideToast, timeout);
    }

    showToastFailure() {
        this.toastMessage = 'Niestety, odpowiedź jest niepoprawna 😞';
        this.showToast();
        this.toast.classList.add('failure');
        this.toast.classList.remove('success');
        this.toast.classList.remove('almost');
        this.toast.classList.remove('error');
        this.timeout = setTimeout(this.hideToast, 2000);
    }

    showToastError(message) {
        this.toastMessage = message;
        this.showToast();
        this.toast.classList.add('error');
        this.toast.classList.remove('success');
        this.toast.classList.remove('failure');
        this.timeout = setTimeout(this.hideToast, 2000);
    }

    showToast = () => {
        const toast = document.querySelector('.toast');
        toast.classList.add('visible');
        toast.classList.remove('invisible');
    }

    hideToast = () => {
        const toast = document.querySelector('.toast');
        toast.classList.add('invisible');
        toast.classList.remove('visible');
    }

    clearToastCorrectnessClasses() {
        this.toast.classList.remove('success');
        this.toast.classList.remove('failure');
        this.toast.classList.remove('error');
    }
}