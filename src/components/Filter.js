import React from 'react'
import { searchActions } from "../store/filterslice"
import { useSelector, useDispatch } from 'react-redux'
import Card from './Card'


import './Filter.css'
import Navbar from './Navbar';


function Filter() {

  const dispatch = useDispatch()

  const productStatus = useSelector(state => state.productActions);
  const searchProduct = useSelector(state => state.searchActions);
  const data = productStatus.product
  const { updateSearch, updateMale, updateCheckboox, updateSleeve, updateValue } = searchActions;

  const { search, checkbox, sleeve, male} = searchProduct

  // const { data,search,setSearch} = useContext(AppContext);

  // const [checkbox , setCheckBox] = useState(false);
  // const [sleeve , setSleeve] =useState(false);
  // const [male , setMale] = useState("");
  // const [value , setValue] = useState("new");

  const handleMale = (e) => {
    dispatch(updateMale("Male"))
    if (!search) {
      let newProducts = data.filter(item => item.gender.includes("M"))
      dispatch(updateSearch(newProducts))
    } else if (search && checkbox) {
      let newProducts = data.filter(item => item.gender.includes("M") && item.cat.toLowerCase().includes("w"))
      dispatch(updateSearch(newProducts))
    } else if (search && !checkbox) {
      let newProducts = data.filter(item => item.gender.includes("M"))
      dispatch(updateSearch(newProducts))
    }
  }


  return (
    <div className="main">
      <Navbar />
      <div className='filter-holder'>
        <div className="gender">
          <h4>Gender:-</h4>
          <div>
            <input onClick={handleMale} type="radio" value="M" name='gender' id='male' /><label htmlFor="male">Male</label><br />
            <input onClick={
              (e) => {
                // setRadio(e.target.value);
                dispatch(updateMale("Female"))
                if (!search) {
                  let newProducts = data.filter(item => item.gender.includes("F"))
                  dispatch(updateSearch(newProducts))
                } else if (search && checkbox) {
                  let newProducts = data.filter(item => item.gender.includes("F") && item.cat.toLowerCase().includes("w"))
                  dispatch(updateSearch(newProducts))

                } else if (search && !checkbox) {
                  dispatch(updateSearch(data.filter(item => item.gender.includes("F"))))
                }
              }
            } type="radio" value="F" name='gender' id='female' /><label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="category">
          <h4>Categories:-</h4>
          <div>
            <input onChange={
              () => {
                dispatch(updateCheckboox(!checkbox))
                if (!search) {
                  let newProducts = data.filter(item => item.cat.toLowerCase().includes("w"))
                  dispatch(updateSearch(newProducts))
                }
                else if (search && checkbox) {
                  let newProducts = data.filter(item => male === "Male" ? item.gender.includes("M") : item.gender.includes("F"))
                  dispatch(updateSearch(newProducts))
                } else if (search && !checkbox) {
                  let newProducts = data.filter(item => male === "Male" ? item.gender.includes("M") && item.cat.toLowerCase().includes("w")
                    :
                    item.gender.includes("F") && item.cat.toLowerCase().includes("w"))
                  dispatch(updateSearch(newProducts))
                }

              }
            } type="checkbox" name='shirt' id='white' checked={checkbox} /><label htmlFor="male">White</label><br />
            <input onChange={
              () => {
                dispatch(updateSleeve(!sleeve));
                if (!search) {
                  let newProducts = data.filter(item => item.folded.toLowerCase().includes("y"))
                  dispatch(updateSearch(newProducts))
                }
                else if (search && !sleeve && checkbox) {
                  let filterdata = data.filter(item => male === "Male" ? item.folded.toLowerCase().includes("y")
                    && item.cat.toLowerCase().includes("w")
                    && item.gender.includes("M") :
                    item.folded.toLowerCase().includes("y")
                    && item.cat.toLowerCase().includes("w")
                    && item.gender.includes("F")
                  )
                  dispatch(updateSearch(filterdata))
                }
                else if (search && sleeve && checkbox) {
                  let filterData = data.filter(item => male === "Male" ?
                    item.cat.toLowerCase().includes("w")
                    && item.gender.includes("M") :
                    item.cat.toLowerCase().includes("w")
                    && item.gender.includes("F")
                  )
                  dispatch(updateSearch(filterData))
                }
                else if (!sleeve) {
                  let filterData = data.filter(item => male === "Male" ?
                    item.gender.includes("M") && item.folded.toLowerCase().includes("y") :
                    item.gender.includes("F") && item.folded.toLowerCase().includes("y")
                  )
                  dispatch(updateSearch(filterData))
                }
                else {
                  let filterData = data.filter(item => male === "Male" ?
                    item.gender.includes("M") :
                    item.gender.includes("F")
                  )
                  dispatch(updateSearch(filterData))
                }
              }
            }
              type="checkbox" name='shirt' id='folded' checked={sleeve} /><label htmlFor="female">Folded Sleeves</label>
          </div>


        </div>

        <div className="sort-holder">
          <select name='opns' onChange={
            (e) => {
              dispatch(updateValue(e.target.value))
              if (search && e.target.value === "price") {
                let newProducts = search.slice().sort((a, b) => a.price - b.price)
                dispatch(updateSearch(newProducts))
              } else if (search && e.target.value === "discount") {
                dispatch(updateValue("discount"))
                let newProducts = search.slice().sort((a, b) => a.discount - b.discount)
                dispatch(updateSearch(newProducts))
              }
              else if (!search && e.target.value === "price") {
                let newProducts = data.slice().sort((a, b) => a.price - b.price)
                dispatch(updateSearch(newProducts))
              } else if (!search && e.target.value === "discount") {
                dispatch(updateValue("discount"))
                let newProducts = data.slice().sort((a, b) => b.discount - a.discount < 0 ? -1 : 1)
                dispatch(updateSearch(newProducts))
              }
            }
          }>
            <option value="new">What's New</option>
            <option value="price">Price low to high</option>
            <option value="discount">Better Discount</option>
          </select>
        </div>

      </div>
      <div className="product-tile-holder">
        {
          productStatus.status === "pending" ? (<div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>) : productStatus.status === "success" ? search?search.map((product) =>
            <Card
              key={product._id}
              image={product.otherImages[0]}
              name={product.name}
              description={product.description}
              finalPrice={product.price}
              oldPrice={product.strickPrice}
              discount={product.discount}
              prod={product}
            />) :(data.map((product) => <Card
              key={product._id}
              image={product.otherImages[0]}
              name={product.name}
              description={product.description}
              finalPrice={product.price}
              oldPrice={product.strickPrice}
              discount={product.discount}
              prod={product}
            />)) : ""
        }
      </div>

    </div>
  )
}

export default Filter