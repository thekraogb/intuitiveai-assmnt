import axios from 'axios';

// Get characters
export const characters = async (req, res) => {
    const { name, species, page } = req.query; 

    try {
      let apiUrl = 'https://rickandmortyapi.com/api/character';
      let params = {};
  
      if (name) params.name = name;
      if (species) params.species = species;
      if (page) params.page = page; 
  
      const response = await axios.get(apiUrl, { params });
  
      res.json(response.data); 
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching characters', 
        error: error.response?.data || error.message 
      });
    }
  };
