import { useState } from "react";
import styles from './SearchBar.module.css';
import { DrupalTaxonomyTerm } from 'next-drupal';

interface SearchbarProps {
  terms: DrupalTaxonomyTerm[],
  types: DrupalTaxonomyTerm[],
  onSearch: (filters: { term: string; type: string; priceMin: number | null; priceMax: number | null; beds: number | null; baths: number | null }) => void;
}

function SearchBar({ onSearch, terms, types, ...props }: SearchbarProps){

  const handleSearch = () => {
    onSearch({
      term: selectedLocation,
      priceMin: selectedPriceMin,
      priceMax: selectedPriceMax,
      beds: selectedBeds,
      type: selectedType,
      baths: selectedBaths,
    });
  };

  const bedsOptions = [1, 2, 3, 4, 5];
  const bathsOptions = [1, 2, 3, 4, 5];

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPriceMin, setSelectedPriceMin] = useState<number | null>(null);
  const [selectedPriceMax, setSelectedPriceMax] = useState<number | null>(null);
  const [selectedBeds, setSelectedBeds] = useState<number | null>(null);
  const [selectedBaths, setSelectedBaths] = useState<number | null>(null);

  return (
    <div {...props} className={` ${styles.searchForm} flex justify-self-center p-5 m-5 md:bg-slate-300 bg-none rounded-lg gap-2 flex-wrap md:shadow z-50`}>
      {/* Ville */}
      <select
        name="city"
        value={selectedLocation}
        className="w-48 p-2 rounded outline-slate-500 md:w-60"
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">Location</option>
        {terms.map((term) => (
          <option key={term.id} value={term.name}>
            {term.name}
          </option>
        ))}
      </select>

      {/* Property Type */}
      <select
        name="type"
        value={selectedType}
        className="w-48 p-2 rounded outline-slate-500 md:w-60"
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Property Type</option>
        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

      {/* Price */}
      <div className="flex gap-2">
        <input
          type="number"
          name="priceMin"
          placeholder="Minimum price"
          value={selectedPriceMin}
          onChange={(e) => setSelectedPriceMin(e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-48 p-2 border rounded outline-slate-500 md:w-30"
        />
        <input
          type="number"
          name="priceMax"
          placeholder="Maximum price"
          value={selectedPriceMax}
          onChange={(e) => setSelectedPriceMax(e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-48 p-2 border rounded outline-slate-500 md:w-30"
        />
      </div>

      {/* Bed Rooms */}
      <select
        value={selectedBeds ?? null}
        onChange={(e) => setSelectedBeds(e.target.value ? parseInt(e.target.value) : undefined)}
        className="w-48 p-2 border rounded outline-slate-500 md:w-30"
      >
        <option value="">Bedrooms</option>
        {bedsOptions.map((bed, index) => (
          <option key={index} value={bed}>
            + {bed} {bed === 1 ? 'Bedroom' : 'Bedrooms'}
          </option>
        ))}
      </select>

      <select
        value={selectedBaths ?? null}
        onChange={(e) => setSelectedBaths(e.target.value ? parseInt(e.target.value) : undefined)}
        className="w-48 p-2 border rounded outline-slate-500 md:w-30"
      >
        <option value="">Bathrooms</option>
        {bathsOptions.map((bath, index) => (
          <option key={index} value={bath}>
            + {bath} {bath === 1 ? 'Bathroom' : 'Bathrooms'}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="w-full p-2 font-bold text-white rounded outline-none bg-slate-500 hover:bg-slate-700 md:w-32"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
