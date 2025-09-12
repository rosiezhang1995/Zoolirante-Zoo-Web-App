using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZooWebApp.Models
{
    public class Animal
    {
        [Key]
        [Display(Name = "Animal Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AnimalID { get; set; }

        [Required]
        [Display(Name = "Animal Name")]
        [StringLength(50, ErrorMessage = "Animal Name must be no more than 50 characters")]
        public string AnimalName { get; set; }

        [Display(Name = "Animal Description")]
        [StringLength(500, ErrorMessage = "Description must be no more than 500 characters")]
        public string? Description { get; set; }

        [Required]
        [Display(Name = "Animal Age")]
        public int AnimalAge { get; set; }

        [Required]
        [Display(Name = "Species")]
        [StringLength(100, ErrorMessage = "Species must be no more than 100 characters")]
        public string Species { get; set; }

        [Required]
        [Display(Name = "Gender")]
        [StringLength(1, ErrorMessage = "Gender must be M or F")]
        public string Gender { get; set; }

        [Display(Name = "Animal Image")]
        public string? AnimalImage { get; set; }

        [Required]
        [Display(Name = "Animal Weight")]
        [Range(0, 15000)]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Weight{ get; set; }

        [Required]
        [Display(Name = "Animal Date of Arrival")]
        [Column(TypeName = "Date")]
        public DateTime DateOfArrival { get; set; }

        [Required]
        [Display(Name = "Animal location")]
        public string MapImage { get; set; }

        public ICollection<Event> Events { get; set; } = new List<Event>();
    }
}
