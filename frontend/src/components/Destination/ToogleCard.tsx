type ToogleCardProps = {
    title : string,
    img : string,
    isSet : boolean,
    onClick : () => void
}

function ToogleCard({ title ,img, isSet, onClick } : ToogleCardProps){
  return (
    <div className={`flex flex-col gap-3 items-center w-28 border-2 border-border p-3 rounded-md cursor-pointer hover:bg-secondary ${isSet && ('border-green-500')}`} onClick={onClick}>
        <img className='w-14 h-14' src={img} alt={`${title} image`} />
        <h4 className='text-xl font-bold'>{title}</h4>
    </div>
  )
}

export default ToogleCard;