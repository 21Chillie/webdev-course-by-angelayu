import e from "express";

const app = e();
const port = 3000;

app.get("/", (req, res) => {
	const todayDate = new Date();
	const getDay = todayDate.getDay();

	const dateData = {
		todayDate: todayDate,
		getDay: 6,
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		todayDayName: dayNames[getDay], // Note: getDay() returns 0-6 (Sunday-Saturday)
		isWeekend: false,
		messageToday: "",
	};

	if (dateData.getDay === 0 || dateData.getDay === 6) {
		dateData.isWeekend = true;
	} else {
		dateData.isWeekend = false;
	}

	if (dateData.isWeekend) {
		dateData.messageToday = "It's weekend, it's time to have fun!";
	} else {
		dateData.messageToday = "It's weekday, it's time to work hard!";
	}

	res.render("index.ejs", { dateData });
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
