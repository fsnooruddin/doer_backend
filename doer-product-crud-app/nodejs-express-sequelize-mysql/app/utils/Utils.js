module.exports = {

   ReservationStates : {
      Requested: 'requested',
      SentToDoer: 'sentToDoer',
      Accepted: 'accepted',
      Declined: 'declined',
      Completed: 'completed',
      Abandoned: 'abandoned'
    },

    getJSDateTime: function(mysqlDateTime)
     {
      var t = mysqlDateTime.split("T");
      var r = t[1].split(".");
      return (t[0]+ " " + r[0]);
     },

    timesMatch : function(reqSlotTime, slotTime) {

        let retArray=slotTime.split("-");
        let doerStartTime = parseInt(retArray[0]);
        let doerCloseTime = parseInt(retArray[1]);
        console.log("doer start time = " + doerStartTime);
        console.log("doer end time = " + doerCloseTime);

        retArray=reqSlotTime.split("-");
        let reqStartTime = parseInt(retArray[0]);
        let reqCloseTime = parseInt(retArray[1]);
        console.log("req start time = " + reqStartTime);
        console.log("req end time = " + reqCloseTime);

    	if(reqStartTime >= doerStartTime) {
          console.log("start times match...");
          if(reqCloseTime <= doerCloseTime) {
         	 console.log("close times match...");
          	 return true;
          }
        }
        return false;
      }
};