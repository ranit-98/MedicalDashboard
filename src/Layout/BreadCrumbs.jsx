import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbs = (props) => {
  return (
    <>
    <div class="breadcrumbs overlay">
  <div class="container">
    <div class="bread-inner">
      <div class="row">
        <div class="col-12">
          <h2>{props.data}</h2>
          <ul class="bread-list">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <i class="icofont-simple-right"></i>
            </li>
            <li class="active">{props.data}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>;
</>
  )
}

export default BreadCrumbs

