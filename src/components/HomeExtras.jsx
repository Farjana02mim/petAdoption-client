import hero1 from "../assets/hero1.avif";
import hero2 from "../assets/hero2.avif";
import hero3 from "../assets/hero3.avif";

const heroes = [
  { id: 1, name: "Alice", photo: hero1, title: "Pet Adopter" },
  { id: 2, name: "Bob", photo: hero2, title: "Pet Volunteer" },
  { id: 3, name: "Cathy", photo: hero3, title: "Pet Caregiver" },
];

const HomeExtras = () => {
  return (
    <section className="text-center my-16">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Meet Our Pet Heroes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {heroes.map((hero) => (
          <div key={hero.id} className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow hover:shadow-lg transition">
            <img src={hero.photo} alt={hero.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{hero.name}</h3>
            <p className="text-gray-600">{hero.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeExtras;
