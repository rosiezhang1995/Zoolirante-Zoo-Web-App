using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZooWebApp.Models
{
    public class User
    {
        [Key]
        [Display(Name = "User Id")]
        public int UserID { get; set; }

        [Required]
        [Display(Name = "Username")]
        [StringLength(50, ErrorMessage = "Username must be no more than 50 characters")]
        public string Username { get; set; }

        [Required]
        [Display(Name = "Password")]
        [StringLength(100, ErrorMessage = "Password hash must be no more than 100 characters")]
        public string PasswordHash { get; set; }

        [Required]
        [Display(Name = "Full Name")]
        [StringLength(100, ErrorMessage = "Full Name must be no more than 100 characters")]
        public string FullName { get; set; }

        [Display(Name = "Address")]
        [StringLength(200, ErrorMessage = "Address must be no more than 200 characters")]
        public string? Address { get; set; }

        [Display(Name = "Phone Number")]
        [StringLength(15)]
        public string? Phone { get; set; }

        [Required]
        [Display(Name = "Email Address")]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Administrator")]
        public bool IsAdmin { get; set; }

        [Required]
        [Display(Name = "Member")]
        public bool IsMember { get; set; }
    }
}
