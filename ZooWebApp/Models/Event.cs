using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZooWebApp.Models
{
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EventID { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "Date")]
        public DateTime EventData { get; set; }

        [Required]
        [Column(TypeName = "Time")]
        public TimeOnly EventTime { get; set; }

        [Required]
        [StringLength (100)]
        public string Location { get; set; }

        public ICollection<EventAnimal> EventAnimals { get; set; } = new List<EventAnimal>();
    }
}
