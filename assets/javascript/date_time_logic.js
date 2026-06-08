export class DateTime {

    //  function to get current date and time
    getCurrentDateTime = () => {
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        }).format(now);

        const [date, time] = formattedDate.split(', ');
        const finalString = `${time} ${date}`;

        console.log(finalString); // Output: 11:17 AM 1/17/2026
        return finalString;
    }
   
}