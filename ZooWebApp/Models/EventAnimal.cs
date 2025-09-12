using System.ComponentModel.DataAnnotations.Schema;

namespace ZooWebApp.Models
{
    public class EventAnimal
    {
        [ForeignKey("Event")]
        public int EventID { get; set; }
        public Event Event { get; set; }

        [ForeignKey("Animal")]
        public int AnimalID { get; set; }
        public Animal Animal { get; set; }
    }
}
