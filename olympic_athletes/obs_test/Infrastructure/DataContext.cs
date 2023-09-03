using Microsoft.EntityFrameworkCore;
using obs_test.Domain.Entities;

namespace obs_test.Infrastructure;

public partial class DataContext : DbContext
{
    /// <summary>
    /// </summary>
    public DataContext()
    {
    }

    /// <summary>
    /// </summary>
    /// <param name="options"></param>
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Athlete> Athletes { get; set; }

    public virtual DbSet<AthletePhoto> AthletePhotos { get; set; }

    public virtual DbSet<AthleteResult> AthleteResults { get; set; }

    public virtual DbSet<Game> Games { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Athlete>(entity =>
        {
            entity.ToTable("Athlete");

            entity.HasIndex(e => e.PhotoId, "IX_Athlete_photo_id").IsUnique();

            entity.Property(e => e.AthleteId).HasColumnName("athlete_id");
            entity.Property(e => e.Bio).HasColumnName("bio");
            entity.Property(e => e.DateOfBirth).HasColumnName("date_of_birth");
            entity.Property(e => e.Height).HasColumnName("height");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.PhotoId).HasColumnName("photo_id");
            entity.Property(e => e.Surname).HasColumnName("surname");
            entity.Property(e => e.Weight).HasColumnName("weight");

            entity.HasOne(d => d.Photo).WithOne(p => p.Athlete).HasForeignKey<Athlete>(d => d.PhotoId);
        });

        modelBuilder.Entity<AthletePhoto>(entity =>
        {
            entity.HasKey(e => e.PhotoId);

            entity.ToTable("AthletePhoto");

            entity.Property(e => e.PhotoId).HasColumnName("photo_id");
            entity.Property(e => e.Blob).HasColumnName("photo");
            entity.Property(e => e.MimeType).HasColumnName("mime_type");
        });

        modelBuilder.Entity<AthleteResult>(entity =>
        {
            entity.HasKey(e => new { e.AthleteId, e.GameId });

            entity.ToTable("AthleteResult");

            entity.HasIndex(e => e.GameId, "IX_AthleteResult_game_id");

            entity.Property(e => e.AthleteId).HasColumnName("athlete_id");
            entity.Property(e => e.GameId).HasColumnName("game_id");
            entity.Property(e => e.Bronze).HasColumnName("bronze");
            entity.Property(e => e.Gold).HasColumnName("gold");
            entity.Property(e => e.Silver).HasColumnName("silver");

            entity.HasOne(d => d.Athlete).WithMany(p => p.AthleteResults).HasForeignKey(d => d.AthleteId);

            entity.HasOne(d => d.Game).WithMany(p => p.AthleteResults).HasForeignKey(d => d.GameId);
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.ToTable("Game");

            entity.Property(e => e.GameId).HasColumnName("game_id");
            entity.Property(e => e.City).HasColumnName("city");
            entity.Property(e => e.Year).HasColumnName("year");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}