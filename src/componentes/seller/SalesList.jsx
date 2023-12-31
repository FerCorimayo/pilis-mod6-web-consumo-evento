/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa'
import { listBusinessSeller, listSurrenderSeller, listTransactionsSeller } from "../../helpers/seller";
import { updateTransaction } from "../../helpers/transaction";
import { createSurrender } from "../../helpers/surrender";
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import { HiOutlineSearch } from 'react-icons/hi';
import moment from 'moment';
import DatePicker, {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'

registerLocale('es', es)

const SalesList = () => {

  const {currentUser} = useContext(AuthContext);
  const [salesList, setSalesList] = useState([]);
  const [surrenderList, setSurrenderList] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filterList, setFilterList] = useState([]);

  const [seller, setSeller] = useState();

  const navigate = useNavigate();

  const location = useLocation();
	const stateSeller = location.state?.stateSeller;

  useEffect(() => {
    if (stateSeller) {
      getTransactionsSeller(stateSeller.id)
      getSurrenderSeller(stateSeller.id)
    }else{
      listBusinessSeller(currentUser.id).then((body) => {
        if (body.message) {
          return Swal.fire('Error', body.message, 'error');
        }
        if(body[0]){
          setSeller(body[0])
          getTransactionsSeller(body[0].id)
          getSurrenderSeller(body[0].id)
        }  
      }).catch((error) => {console.error('Error:', error)});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactionsSeller = (id) => {
    listTransactionsSeller(id).then((body) => {
      if (body.message) {
        return Swal.fire('Error', body.message, 'error');
      }
      setSalesList(body)
      setFilterList(body)
    }).catch((error) => {console.error('Error:', error)});
  }
  const getSurrenderSeller = (id) => {
    listSurrenderSeller(id).then((body) => {
      if (body.message) {
        return Swal.fire('Error', body.message, 'error');
      }
      setSurrenderList(body)
    }).catch((error) => {console.error('Error:', error)});
  }

  const desdeDate = (date) =>{
    setStartDate(date)
  }
  const hastaDate = (date) =>{
    setEndDate(date)
  }
  const filtrarPorFechas = () => {
    if (startDate && endDate) {
      const fechaDesdeObjeto = moment(startDate).format('YYYY-MM-DDTHH:mm')
      const fechaHastaObjeto = moment(endDate).format('YYYY-MM-DDTHH:mm')
      const resultadosFiltrados = salesList.filter(objeto =>
        objeto.date >= fechaDesdeObjeto && objeto.date <= fechaHastaObjeto
      )
      setFilterList(resultadosFiltrados)      
    } else {
      setFilterList(salesList)
    }
  }

  const pagarRendicion = (monto, list) => {
    const fechaDesde = moment(startDate).format('YYYY-MM-DDTHH:mm')
    const fechaHasta = moment(endDate).format('YYYY-MM-DDTHH:mm')
    if (startDate != null && endDate != null && monto != 0) {
      const contienePagado = list.some(item => item.status === true)
      if (contienePagado) return Swal.fire('Oops...', 'Hay un registro ya Pagado', 'warning')
      Swal.fire({
        title: 'Realizar Pago!',
        text: "Se realizara un Pago de Rendicion!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {     
          const surrender = {
            startAt: fechaDesde,
            endAt: fechaHasta,
            amount: monto,
            idBusiness: stateSeller.id
          }
          createSurrender(surrender).then((body) => {
            if(body.message){
                return Swal.fire('Error', body.message, 'error')
            }
            Swal.fire({ title: 'Cargando...', timerProgressBar: true, didOpen: () => {Swal.showLoading()}})//start loading
            const promises = list.map(async(item) => {
              updateTransaction({status:true}, item.id).then((body) => {
                if(body.message){
                  Swal.fire('Error', body.message, 'error')
                }
              }).catch((error) => {console.error('Error:', error)});
              await new Promise(resolve => setTimeout(resolve, 1000));
              return item
            })
            Promise.all(promises).then(()=>{
              Swal.DismissReason.timer//close loading
              Swal.fire('Exito!','Pago Realizado!','success')
              getSurrenderSeller(stateSeller.id)
              getTransactionsSeller(stateSeller.id)
              setStartDate('')
              setEndDate('')
              stateSeller.balance -= monto
            }).catch((error) => {console.log('Error',error)})
          }).catch((error) => {console.error('Error:', error)})
        }
      })
    }else{
      return Swal.fire('Oops...', 'Filtra las fechas a pagar', 'warning')
    }
  }

  return (
    <section className="p-4 bg-white md:w-11/12 rounded-2xl md:my-5 md:mx-auto">
      {
        stateSeller ?
          (
            <div className="flex justify-between border-b-2 border-solid border-zinc-500 pb-4">
              <FaChevronLeft className="w-5 h-auto mx-1 cursor-pointer text-zinc-500 hover:text-zinc-400" onClick={()=>(navigate('/vendedores'))} />
              <p className="text-3xl font-bold text-zinc-500">({stateSeller.name}) Ventas Realizadas</p>
            </div>
          )
        :
          (
            <>
              <div className="flex justify-center pb-4 border-b-2 border-zinc-400">
                <div className="md:pr-10 md:pt-5">
                  <p className="text-3xl font-bold md:text-4xl text-zinc-500">"{seller?.name}"</p>
                </div>
              </div>
              <div className="flex justify-center pb-4">
                <div className="md:pr-10 md:pt-5">
                  <p className="text-3xl font-semibold md:text-4xl text-zinc-500">Lista de Ventas</p>
                </div>
              </div>
            </>
          )
      }
      <>
        <label className="p-2 pt-8 md:hidden text-2xl font-semibold text-zinc-400">Balance: ${stateSeller? stateSeller.balance: seller?.balance}</label>
        <form className="flex justify-start w-full">
          <div className="w-2/12 p-2 max-md:w-full">
            <label className="block text-lg font-medium text-zinc-500">Desde: </label>
            <DatePicker selected={startDate} onChange={desdeDate} locale={es} showTimeSelect dateFormat={'dd/MM/yyyy HH:mm'} timeFormat="HH:mm" timeIntervals={15} timeCaption="Hora" 
              placeholderText="Filtrar Fecha"
              className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
            />
          </div>
          <div className="w-2/12 p-2 max-md:w-full">
            <label className="block text-lg font-medium text-zinc-500">Hasta: </label>
            <DatePicker selected={endDate} onChange={hastaDate} locale={es} showTimeSelect dateFormat={'dd/MM/yyyy HH:mm'} timeIntervals={15}
              placeholderText="Filtrar Fecha"
              className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
            />
          </div>
          <div className="w-3/12 p-2 max-md:w-full">
            <button type="button" onClick={() => filtrarPorFechas()} className="bg-[#D6DCE5] hover:bg-[#c6d4e7] font-medium text-zinc-600 mt-6 py-3 px-9 rounded-full flex justify-center items-center"><HiOutlineSearch className="mr-1"/>Buscar</button>
          </div>
          <div className="w-5/12 p-2 flex justify-end items-center">
            <label className="max-md:hidden text-2xl font-semibold text-zinc-400">Balance: ${stateSeller? stateSeller.balance: seller?.balance}</label>
          </div>
        </form>
      </>
      {
        salesList.length === 0 ?
          (
            <div className="overflow-auto rounded-lg shadow">
              <div className="table w-full p-2 mt-12">
                <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400 pb-2">Orden</div>
                <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Cliente</div>
                <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">DNI</div>
                <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Fecha</div>
                <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Estado</div>
                <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Monto</div>
              </div>
              <div className="flex justify-center items-center mt-16">
                <div className="text-center font-semibold text-2xl text-zinc-400 pt-3 pb-3">
                  No existen registros de Ventas
                </div>
              </div>
            </div>
          )
          :
          (
            <>
            <div className="overflow-auto rounded-lg shadow">
              <div className="table w-full p-2 mt-10">
                <div className="table-row">
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400 pb-2">Orden</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Cliente</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">DNI</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Fecha</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Estado</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Monto</div>
                </div>
                <div className="table-row-group">
                  {
                    filterList.map((sales, index) => (
                      <div className="table-row" key={index}>
                        <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.id }</div>
                        <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.wallet.user.fullname }</div>
                        <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.wallet.user.dni }</div>
                        <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ moment.utc(sales.date).format('DD/MM/yyyy HH:mm') }</div>
                        <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.status? <p className="text-green-400">Pagado</p>:<p className="text-orange-400">Pendiente</p> }</div>
                        <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">${ sales.amount }</div>
                      </div>
                    ))
                  }
                </div>
              </div>
              { filterList.length === 0 && (
                <div className="flex justify-center items-center mt-16">
                  <div className="text-center font-semibold text-2xl text-zinc-400 pt-3 pb-3">
                    Registro de Ventas no encontradas
                  </div>
                </div>
              )}
            </div>
            <div className="w-full p-2 pb-6">
              {stateSeller && (
                <button type="button" onClick={()=>pagarRendicion(filterList.reduce((acu,sales) => acu+sales.amount,0),filterList)} className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white py-3 px-9 rounded-full float-left">Pagar Rendicion</button>
              )}
              <div className="text-end px-8 font-bold text-xl text-zinc-500 pt-3 pb-3">
                  <label>
                    Monto Total: {filterList.reduce((acu,sales) => acu+sales.amount,0)}
                  </label>
              </div>
            </div>
            <div className="flex justify-center pb-4">
              <div className="md:pr-10 md:pt-5">
                <p className="text-3xl font-semibold md:text-4xl text-zinc-500">Lista de Rendicion</p>
              </div>
            </div>
            <div className="overflow-auto rounded-lg shadow">
              <div className="table w-full p-2 mt-10">
                <div className="table-header-group">
                  <div className="table-row">
                    <div className="table-cell whitespace-nowrap pb-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">ID</div>
                    <div className="table-cell whitespace-nowrap px-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Fecha Inicio</div>
                    <div className="table-cell whitespace-nowrap px-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Fecha Fin</div>
                    <div className="table-cell whitespace-nowrap px-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Monto</div>
                  </div>
                </div>
                <div className="table-row-group">
                  {surrenderList.map((item) => (
                    <div className="table-row" key={item.id}>
                      <div className="table-cell whitespace-nowrap  pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.id}</div>
                      <div className="table-cell whitespace-nowrap px-2 pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{moment.utc(item.startAt).format('DD/MM/yyyy HH:mm')}</div>
                      <div className="table-cell whitespace-nowrap px-2 pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{moment.utc(item.endAt).format('DD/MM/yyyy HH:mm')}</div>
                      <div className="table-cell whitespace-nowrap px-2 pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">${item.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
              { surrenderList.length === 0 && (
                <div className="flex justify-center items-center mt-16">
                  <div className="text-center font-semibold text-2xl text-zinc-400 pt-3 pb-3">
                    No existen registros de Rendicion
                  </div>
                </div>
              )}
            </div>
            </>
          )
      }
    </section>
  )
}

export default SalesList;