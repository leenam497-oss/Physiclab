import { useContext, useState } from 'react';

import {
  Atom,
  Droplet,
  Flame,
  FlaskConical,
  TestTube,
  Zap,
} from 'lucide-react';

import MoleculeViewer from '../components/MoleculeViewer';

const Explore = () => {
    const experiments = [
        {
            id: 1,
            title: 'Vật lý lớp 12',
            icon: <FlaskConical className="w-5 h-5" />,
            description: 'Chương 1. Vật lý nhiệt',
            context:`Thí nghiệm PHET: Lực và chuyển động. Nội dung:
                - Khảo sát tác dụng của lực lên chuyển động
                - Mối quan hệ giữa lực, khối lượng và gia tốc
                - Minh họa định luật II Newton
                Chương trình: KHTN 8 / Vật lý 10`,
            iframeUrl: '/simulations/VL12-B1/index.html'
        },
        {
            id: 2,
            title: 'Vật lý lớp 12',
            icon: <Atom className="w-5 h-5" />,
            description: 'Chương 1. Vật lý nhiệt',
            iframeUrl: '/simulations/VL12-B2/index.html'
        },
        {
            id: 3,
            title: 'Sự nổi',
            icon: <Droplet className="w-5 h-5" />,
            description: 'Chương: Áp suất – Lực đẩy Ác-si-mét – KHTN 8',
            iframeUrl: 'https://phet.colorado.edu/sims/html/buoyancy/latest/buoyancy_vi.html'
        },
        {
            id: 4,
            title: 'Con lắc lò xo',
            icon: <Flame className="w-5 h-5" />,
            description: 'Chương: Dao động – Vật lý 11',
            iframeUrl: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_vi.html'
        },
        {
            id: 28,
            title: 'Lực đẩy',
            icon: <TestTube className="w-5 h-5" />,
            description: 'Chương: áp suất',
            iframeUrl: '/simulations/archimedes/index.html'
        },
    ]

    const [selectedExperiment, setSelectedExperiment] = useState(experiments[0])

    return (
        <div className="bg-slate-50 flex" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Sidebar - Danh sách thí nghiệm */}
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Thí Nghiệm</h2>
                    <p className="text-sm text-gray-600 mb-6">Chọn một thí nghiệm để bắt đầu</p>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    <div className="space-y-2">
                        {experiments.map((experiment) => (
                            <button
                                key={experiment.id}
                                onClick={() => setSelectedExperiment(experiment)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${selectedExperiment.id === experiment.id
                                    ? 'bg-primary-50 border-2 border-primary-500 shadow-sm'
                                    : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100 hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`mt-1 ${selectedExperiment.id === experiment.id
                                        ? 'text-primary-600'
                                        : 'text-gray-600'
                                        }`}>
                                        {experiment.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-1 ${selectedExperiment.id === experiment.id
                                            ? 'text-primary-900'
                                            : 'text-gray-900'
                                            }`}>
                                            {experiment.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {experiment.description}
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
                            {selectedExperiment.icon}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {selectedExperiment.title}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {selectedExperiment.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Preview - 3D Molecule or Iframe */}
                <div className="flex-1 p-6">
                    {selectedExperiment.type === '3d' ? (
                        <div className="w-full h-full bg-white rounded-lg shadow-lg">
                            <MoleculeViewer
                                moleculeData={selectedExperiment.moleculeData}
                                style="stick"
                                backgroundColor="#f8fafc"
                            />
                        </div>
                    ) : (
                        <iframe
                            src={selectedExperiment.iframeUrl}
                            className="w-full h-full rounded-lg shadow-lg"
                            style={{ border: 'none' }}
                            allowFullScreen
                            title={selectedExperiment.title}
                        />
                    )}
                </div>
            </main>
        </div>
    )
}

export default Explore
