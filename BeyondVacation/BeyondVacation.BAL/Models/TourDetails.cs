using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeyondVacation.BAL.Models
{
    public class TourDetails
    {
        public long TourId { get; set; }
        public string TourName { get; set; }
        public string Destination { get; set; }
        public int CountryId { get; set; }
        public int Days { get; set; }
        public int Nights { get; set; }
        public decimal Cost { get; set; }
        public string TourCode { get; set; }
        public bool Active { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string CreatedByUserName { get; set; }
        public long CreatedByUserId { get; set; }


    }
}
