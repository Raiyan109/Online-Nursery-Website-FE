import logo from '@/assets/logo-dark.png'

const Footer = () => {
  return (
    <div>
      <footer className="px-28 py-8 text-black bg-lightGreen/80">
        <div className=" flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
          <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
            <div className="flex items-center justify-center flex-shrink-0 w-44 h-44 rounded-full ">
              <img src={logo} alt="" />
            </div>
            <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
              <li>
                <a rel="noopener noreferrer" href="/allProduct">Plants</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">Privacy</a>
              </li>
            </ul>
          </div>
          <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
            <li>
              <a rel="noopener noreferrer" href="#">Instagram</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">Facebook</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">Twitter</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer