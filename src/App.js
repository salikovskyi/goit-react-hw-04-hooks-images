import { useState, useEffect, useCallback } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import "./App.css";

import { productsApi } from "./services/searchApi";

const initialState = {
  pictures: [],
  imgTags: "",
  largeImage: "",
  error: null,
  showModal: false,
  loading: false,
  finish: false,
};


export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchProducts();
  }, [query]);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchProducts();
  }, [page]);
  // componentDidUpdate(prevProps, prevState) {
  //   const { query, loading, page } = this.state;
  //   if (prevState.query !== query || (loading && prevState.page < page)) {
  //     this.fetchProducts();
  //   }
  // }

  const toggleModal = () => {
    setState(({showModal}) => {
      return {
        ...state,
        showModal: !showModal
      }
    })
  };

  const bigImage = (largeImage) => {
    setState({
        ...state,
        largeImage,
        showModal: true
    })
  };


 const  searchQuery = useCallback((query) => {
    setQuery(query);
    setPage(1);
    state.pictures = [];
    state.error = null;
    state.finish = false;
    state.loading = false;
  },[]);

  const loadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
    state.loading = true;
    setState({ ...state });
  };

  const fetchProducts = async () => {
    try {
      const { data } = await productsApi.searchPictures(page, query);
      setState(({ pictures }) => {
        const newState = {
          pictures: [...pictures, ...data.hits],
          loading: false,
          error: false,
        };
        if (data.hits.length < 11) {
          newState.finish = true;
        }
        if (data.hits.length === 0) {
          newState.error = true;
        }
        return newState;
      });
     
      console.log(data);
    } catch (error) {
      setState({
        loading: false,
        error: null,
      });
    }
  };
  const { pictures, loading, error, showModal, largeImage, imgTags, finish  } = state;

  return (
    <div className="App">
      <Searchbar onSubmit={searchQuery} />
      {error && <h1 className="title">ШАТАП БРО</h1>}
      <ImageGallery pictures={pictures} onClick={bigImage} />
      {loading && <Loader />}
      {!finish && pictures.length > 11 && !loading && (
        <Button onClick={loadMore} />
      )}

      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={largeImage} alt={imgTags} />
        </Modal>
      )}
    </div>
  );
}
