import React, { useEffect, useState } from "react";
import "../components/animals.css";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Establecer isLoading en true al iniciar la búsqueda
    setIsLoading(true);

    // condicional si no hay texto en el input
    let url = "";
    if (searchValue.trim() !== "") {
      url = `https://api.api-ninjas.com/v1/animals?name=${searchValue.trim()}`;
    } else {
      url = "https://api.api-ninjas.com/v1/animals";
    }

    // fetch a la api con la api key
    fetch(url, {
      headers: {
        "X-Api-Key": "1X+705GiSH2zZAkZqLpC9A==PIp9kt98UxWqkIET",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // condicional para filtrar
        if (searchValue.trim() !== "") {
          setAnimals(
            data.filter((animal) =>
              animal.name
                .toLowerCase()
                .includes(searchValue.toLowerCase().trim())
            )
          );
        } else {
          setAnimals(data);
        }
      })
      .catch((error) => console.error(error))

      // Establecer isLoading en false al terminar la búsqueda
      .finally(() => setIsLoading(false));
  }, [searchValue]);

  // funcion para recoger el dato del input
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <section className="container_general">
        <h1 className="animal_title">Animal Dictionary</h1>

        <p className="animalsText">
          Para buscar animales en la lista, debes ingresar el nombre en inglés.
          Si deseas buscar un animal específico y te aparecen muchos resultados,
          puedes usar un espacio luego del nombre del animal para filtrar y ver
          solo ese resultado, si no funciona, usa el doble espacio.
        </p>

        {/* input */}
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          className="input_animals"
          placeholder="Search the Animal"
        />

        {/* loading de los resultados */}
        {isLoading ? (
          <p className="textCharge">Cargando resultados...</p>
        ) : (
          <ul>
            {animals.length > 0 ? (
              animals.map((animal, index) => (
                <li key={index} className="listAnimals">
                  {/* nombres  */}
                  <p className="styleListAnimals">
                    <span style={{ color: "blue" }}> Name: </span>
                    {animal.name}
                  </p>

                  <p className="styleListAnimals">
                    {animal.taxonomy.scientific_name ? (
                      <span className="textAnimals">
                        Scientific name:{" "}
                        <span className="textAnimals2">
                          {animal.taxonomy.scientific_name}
                        </span>
                      </span>
                    ) : (
                      <span>
                        <span className="textAnimals">scientific name:</span>{" "}
                        Unknow
                      </span>
                    )}
                  </p>

                  <p className="styleListAnimals">
                    {animal.characteristics.habitat ? (
                      <span className="textAnimals">
                        Habitat:{" "}
                        <span className="textAnimals2">
                          {animal.characteristics.habitat}
                        </span>
                      </span>
                    ) : (
                      <span>
                        <span className="textAnimals">Habitat:</span> Unknow
                      </span>
                    )}
                  </p>

                  <p className="styleListAnimals">
                    {animal.characteristics.prey ? (
                      <span className="textAnimals">
                        Prey:{" "}
                        <span className="textAnimals2">
                          {animal.characteristics.prey}
                        </span>
                      </span>
                    ) : (
                      <span>
                        <span className="textAnimals">Prey:</span> Unknow
                      </span>
                    )}
                  </p>

                  <p className="styleListAnimals">
                    {animal.characteristics.top_speed ? (
                      <span className="textAnimals">
                        Top Speed:{" "}
                        <span className="textAnimals2">
                          {animal.characteristics.top_speed}
                        </span>
                      </span>
                    ) : (
                      <span>
                        <span className="textAnimals">Top Speed:</span> Unknow
                      </span>
                    )}
                  </p>

                  <p className="styleListAnimals">
                    {animal.characteristics.weight ? (
                      <span className="textAnimals">
                        Weight:{" "}
                        <span className="textAnimals2">
                          {animal.characteristics.weight}
                        </span>
                      </span>
                    ) : (
                      <span>
                        <span className="textAnimals">Weight:</span> Unknow
                      </span>
                    )}
                  </p>

                  <p className="styleListAnimals">
                    {animal.characteristics.height ? (
                      <span className="textAnimals">
                        Height:{" "}
                        <span className="textAnimals2">
                          {animal.characteristics.height}
                        </span>
                      </span>
                    ) : (
                      <span>
                        <span className="textAnimals">Height:</span> Unknow
                      </span>
                    )}
                  </p>

                  <p className="styleListAnimals">
                    {animal.characteristics.most_distinctive_feature ? (
                      <span className="textAnimals">
                        Most distinctive feature:{" "}
                        <span className="textAnimals2">
                          {animal.characteristics.most_distinctive_feature}
                        </span>
                      </span>
                    ) : (
                      <span>
                        <span className="textAnimals">
                          Most distinctive feature:
                        </span>{" "}
                        Unknow
                      </span>
                    )}
                  </p>

                  <hr className="lineAnimal" />
                </li>
              ))
            ) : (
              <li className="textCharge">No se encontraron resultados</li>
            )}
          </ul>
        )}

      </section>
    </>
  );
};

export default Animals;
