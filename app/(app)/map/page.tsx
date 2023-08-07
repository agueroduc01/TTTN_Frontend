'use client';
import { handleGetMap } from '@/api/maps';
import { LegacyRef, useRef } from 'react';

export default function Map() {
  const inputRef = useRef();
  const btnRef = useRef();
  const mapRef = useRef();

  let map = { entities: { clear: true } };

  //   const handleSearch = () => {
  //     map.entities.clear();
  //     geocodeQuery(inputRef.current.value);
  //   };

  //   const getMap = () => {
  //     map = new Microsoft.Maps.Map(mapRef.current, {
  //       credentials:
  //         'Ao6PyCyfS90KFN65nitL8Iq3guJdDOenYEeTH3iv7e-k-i4O_VPcD0alUtobcZzG',
  //     });
  //   };

  //   const geocodeQuery = (query) => {
  //     if (!searchManager) {
  //       Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
  //         searchManager = new Microsoft.Maps.Search.SearchManager(map);
  //         geocodeQuery(query);
  //       });
  //     } else {
  //       let searchRequest = {
  //         where: query,
  //         callback: function () {
  //           if (r && r.result && r.result.length > 0) {
  //             let pin = new Microsoft.Maps.Pushpin(r.result[0].location);
  //             map.entities.push(pin);

  //             map.setView({ bounds: r.result[0].bestView });
  //           }
  //         },
  //         errorCallback: function (e) {
  //           alert('No results found');
  //         },
  //       };
  //       searchManager.geocode(searchRequest);
  //     }
  //   };

  return (
    <>
      <main className="flex items-center flex-col justify-center w-[100vw] h-[84vh]">
        <div className="mt-3">
          <input
            className="w-[40vw] h-[10vh] rounded-md border-gray-300 p-2 mr-2 border-2"
            placeholder="Search"
            ref={inputRef}
          />
          <button
            onClick={() => console.log(inputRef.current)}
            ref={btnRef}
            className="w-[10vw] h-[8vh] bg-slate-400 rounded-md border-cyan-600 p-1 hover:text-blue-200 items-center"
          >
            Search
          </button>
        </div>
        <div className="w-[80vw] h-[80vh] m-5 bg-slate-500" ref={mapRef}></div>
      </main>
    </>
  );
}
