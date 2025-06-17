export function initializeStepHeaders() {
    const stepHeaders = document.querySelectorAll('.step-header');

    stepHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const step = this.parentElement;
            const content = step.querySelector('.step-content');
            const icon = this.querySelector('.step-icon');

            stepHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherStep = otherHeader.parentElement;
                    const otherContent = otherStep.querySelector('.step-content');
                    const otherIcon = otherHeader.querySelector('.step-icon');

                    otherContent.classList.remove('active');
                    otherIcon.classList.remove('rotated');
                }
            });

            content.classList.toggle('active');
            icon.classList.toggle('rotated');
        });
    });
}