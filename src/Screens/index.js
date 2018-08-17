//API imports
import Home from './Home';
import Emotion from './IBM/Emotions';
import BusSearch from './Government/Bus';
import Movies from './Entertainment/Movies';
import Gifs from './Entertainment/Gifs';
import Space from './Entertainment/Space';
import Translate from './Google/Translate';
import Analyzer from './AWS/VideoAnalysis';

//Web App utility imports
import Add from './Add';


// This index page imports all screens. For example:

// index.js -> screens.index.js -> screens folder -> IBM folder -> Emotion

export {
	Home,
	Emotion,
	BusSearch,
	Movies,
	Translate,
	Gifs,
	Space,
	Add,
  Analyzer
	 };