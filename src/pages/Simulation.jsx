import { useState } from 'react';

import {
  Atom,
  Orbit,
} from 'lucide-react';

const Simulation = () => {
    const simulations = [
        {
            id: 28,
            title: 'Cấu Trúc Hạt Nhân Galactic Hoạt Động (AGN)',
            icon: <Orbit className="w-5 h-5" />,
            description: 'Khám phá cấu trúc của hạt nhân galactic hoạt động trong không gian 3D',
            iframeUrl: 'https://sketchfab.com/models/c48972411beb4273a6226c6ca2eb9163/embed'
        },
        {
            id: 29,
            title: 'Cấu Trúc Mặt Trời',
            icon: <Atom className="w-5 h-5" />,
            description: 'Mô phỏng chi tiết cấu trúc bên trong của Mặt Trời',
            iframeUrl: 'https://sketchfab.com/models/4de530d825d94d84b1f4c0c66ed2a012/embed'
        },
        {
            id: 30,
            title: 'Môi Trường Xung Quanh Lỗ Đen Không Quay',
            icon: <Orbit className="w-5 h-5" />,
            description: 'Khám phá môi trường và không gian xung quanh lỗ đen không quay trong vũ trụ',
            iframeUrl: 'https://sketchfab.com/models/ee5aa423deca4b28ac8c4d9d15d744bb/embed'
        },
        {
            id: 32,
            title: 'Hiệu ứng quang điện',
            icon: <Orbit className="w-5 h-5" />,
            description: 'Khám phá hiệu ứng quang điện và mối liên hệ giữa các đại lượng trong hiệu ứng quang điện',
            iframeUrl: 'https://effectuall.github.io/Simulations/Quantum_Photoelectric_Effect'
        },
        {
            id: 33,
            title: 'Dòng điện xoáy (dòng Foucault)',
            icon: <Orbit className="w-5 h-5" />,
            description: 'Mô phỏng thể hiện hướng dòng điện xoáy, hiện tượng cảm ứng điện từ',
            iframeUrl: 'https://sketchfab.com/models/c5f8170bdb6c445994cfc387e9a4a6f8/embed'
        },
        {
            id: 34,
            title: 'Hiện tượng phản xạ ánh sáng',
            icon: <Orbit className="w-5 h-5" />,
            description: '',
            iframeUrl: 'https://effectuall.github.io/Simulations/Optics_Reflection_of_Light.html'
        },
        {
            id: 35,
            title: 'Kính thiên văn',
            icon: <Orbit className="w-5 h-5" />,
            description: 'Mô phỏng sơ đồ tia sáng đi vào kính thiên văn',
            iframeUrl: 'https://effectuall.github.io/Simulations/Optics_Reflection_of_Light.html'
        },
        {
            id: 35,
            title: 'Chuyển động ném',
            icon: <Orbit className="w-5 h-5" />,
            description: 'Mô phỏng chuyển động ném ngang, ném xiên',
            iframeUrl: 'https://effectuall.github.io/Simulations/Mechanics_Projectile_Motion.html'
        }
    ];

    const [selectedSimulation, setSelectedSimulation] = useState(simulations[0]);

    return (
        <div className="bg-slate-50 flex" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Sidebar - Danh sách mô phỏng */}
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Mô Phỏng 3D</h2>
                    <p className="text-sm text-gray-600 mb-6">Chọn một mô phỏng để bắt đầu</p>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    <div className="space-y-2">
                        {simulations.map((simulation) => (
                            <button
                                key={simulation.id}
                                onClick={() => setSelectedSimulation(simulation)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${selectedSimulation.id === simulation.id
                                    ? 'bg-primary-50 border-2 border-primary-500 shadow-sm'
                                    : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100 hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`mt-1 ${selectedSimulation.id === simulation.id
                                        ? 'text-primary-600'
                                        : 'text-gray-600'
                                        }`}>
                                        {simulation.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-1 ${selectedSimulation.id === simulation.id
                                            ? 'text-primary-900'
                                            : 'text-gray-900'
                                            }`}>
                                            {simulation.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {simulation.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content - Preview */}
            <main className="flex-1 flex flex-col bg-slate-100">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="text-primary-600">
                            {selectedSimulation.icon}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {selectedSimulation.title}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {selectedSimulation.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Preview - 3D Model */}
                <div className="flex-1 p-6">
                    <div className="w-full h-full bg-white rounded-lg shadow-lg">
                        <iframe
                            src={selectedSimulation.iframeUrl}
                            className="w-full h-full rounded-lg"
                            style={{ border: 'none' }}
                            allowFullScreen
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            title={selectedSimulation.title}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Simulation;
