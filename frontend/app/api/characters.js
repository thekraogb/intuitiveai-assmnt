
export const fetchCharacters = async (page, search) => {
    try {
      const response = await fetch(`http://localhost:5001/api/characters?page=${page}&name=${search}`);
      const data = await response.json();
      
      return {
        characters: data.results, 
        totalPages: data.info.pages,
      };
    } catch (error) {
      console.error('Error fetching characters:', error);
      return {
        characters: [],
        totalPages: 1,
      };
    }
  };
  
