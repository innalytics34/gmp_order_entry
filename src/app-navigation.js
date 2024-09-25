import {getFromAPI} from './api/apicall'


export const navigation = async () => {
  try {
    const response = await getFromAPI('/get_sidebar');
    const menu = response.main_menu;
    return menu;
  } catch (error) {
    console.error('Error fetching sidebar data:', error);
    return []; 
  }
};

