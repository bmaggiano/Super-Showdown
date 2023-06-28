"use client"

const features = [
    { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
    { name: 'Material', description: 'Solid walnut base with rare earth magnets and polycarbonate add-ons.' },
    { name: 'Dimensions', description: '15" x 3.75" x .75"' },
    { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
    { name: 'Includes', description: 'Pen Tray, Phone Tray, Small Tray, Large Tray, Sticky Note Holder' },
    { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
  ]
  
  export default function PlayHead() {
    return (
        <>
      <div className="bg-white">
        <div aria-hidden="true" className="relative">
          <img
            src="./playbanner.jpg"
            alt=""
            className="h-96 w-full object-center"
            />
          <div className="absolute inset-0 bg-gradient-to-t from-white" />
        </div>
  
        <div className="relative mx-auto -mt-12 max-w-7xl px-4 sm:px-6 sm:pb-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h1 className="text-4xl font-bold tracking-wide text-gray-900 sm:text-5xl">Let's get ready to rumble!</h1>
          </div>
  
        </div>
      </div>
            </>
    )
  }
  