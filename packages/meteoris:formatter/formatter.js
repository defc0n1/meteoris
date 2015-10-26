Namespace('Meteoris.Formatter');

Meteoris.Formatter = {
    /**
     * Formatting date to desired format, this function needs moment packages     
     */
    date: function(date, format) {
        if (date)
            return moment(date).format(format != null && format != '' ? format : 'DD MMM YYYY');
        else
            return "-";
    },
    /**
     * Formatting date to desired format, this function needs moment packages     
     */
    dateTime: function(date, format) {
        if (date)
            return moment(date).format(format ? format : 'DD MMM YYYY HH:mm');
        else
            return "-";
    },
    /**
     * get elapsed time whether it's minutes, hours or days     
     */
    elapsedTime: function(date) {
        var dateNow = moment(new Date(TimeSync.serverTime()));
        var elapsedMinutes = dateNow.diff(date, "minutes");
        var elapsedHours = dateNow.diff(date, "hours");
        var elapsedDays = dateNow.diff(date, "days");
        var elapsedMonths = dateNow.diff(date, "months");
        var elapsedYears = dateNow.diff(date, "years");
        var elapsed = 0;
        if (elapsedMinutes <= 60)
            elapsed = elapsedMinutes + "m";
        else if (elapsedMinutes >= 60 && elapsedHours <= 24)
            elapsed = elapsedHours + "h";
        else if (elapsedHours >= 24)
            elapsed = elapsedDays + "d";
        else if (elapsedDays >= 31)
            elapsed = elapsedMonths + "mo";
        else if (elapsedMonths >= 12)
            elapsed = elapsedYears + "y";

        return elapsed;
    },
    /**
     * Formatting currency to desired format, this function needs accounting packages     
     */
    currency: function(value) {
        if (value === 0)
            return 0;
        else if (value < 0) //accounting format when number is negative
            return "(" + accounting.formatMoney(value * -1, "", 2, ".", ",") + ")";
        else if (value)
            return accounting.formatMoney(value, "", 0, ".", ",");
    },
    combodate: function(date) {
        if (date)
            return moment(date).format("YYYY-MM-DD");
        else
            return moment(new Date()).format("YYYY-MM-DD");
    },
    combodateEmpty: function(date) {
        if (date)
            return moment(date).format("YYYY-MM-DD");
    },
};


/**
 * Don't edit this if you don't know what exactly are you doing 
 */
UI.registerHelper('meteoris_formatter', function(option, firstParam) {
    return Meteoris.Formatter[option](firstParam);
});
UI.registerHelper('meteoris_formatterDate', function(date, format) {
    return Meteoris.Formatter.date(date, format);
});
UI.registerHelper('meteoris_formatterDateTime', function(date, format) {
    return Meteoris.Formatter.dateTime(date, format);
});
UI.registerHelper('meteoris_formatterCurrency', function(value) {
    return Meteoris.Formatter.currency(value);
});