import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Kelas {
    id: number;
    nama: string;
    trainer: string;
    hari: string;
    jam: string;
    slot_teks: string;
    status: ToneLabel;
}

export default function GymKelas({ kelases }: { kelases: Record<string, any>[] }) {
    const rows: Kelas[] = kelases.map((k) => ({
        id: Number(k.id),
        nama: String(k.nama),
        trainer: String(k.trainer),
        hari: String(k.hari),
        jam: String(k.jam),
        slot_teks: String(k.slot_teks),
        status: k.status as ToneLabel,
    }));

    const columns: Column<Kelas>[] = [
        { key: 'nama', header: 'Kelas', sortValue: (r) => r.nama },
        { key: 'trainer', header: 'Trainer', sortValue: (r) => r.trainer },
        { key: 'hari', header: 'Hari', sortValue: (r) => r.hari },
        { key: 'jam', header: 'Jam', sortValue: (r) => r.jam },
        {
            key: 'slot_teks',
            header: 'Slot',
            render: (r) => <span className="tnum font-medium">{r.slot_teks}</span>,
            sortValue: (r) => r.slot_teks,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'hari',
            label: 'Hari',
            options: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((h) => ({
                value: h,
                label: h,
            })),
            match: (row: any, value: string) => row.hari === value,
        },
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Tersedia', label: 'Tersedia' },
                { value: 'Hampir Penuh', label: 'Hampir Penuh' },
                { value: 'Penuh', label: 'Penuh' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Jadwal Kelas"
                description="Jadwal kelas mingguan: yoga, zumba, HIIT, dan lainnya beserta trainer."
                breadcrumbs={[{ label: 'Gym', href: '/gym' }, { label: 'Jadwal Kelas' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Kelas</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'trainer', 'hari']}
                        filters={filters}
                        pageSize={10}
                        emptyTitle="Belum ada kelas"
                        emptyDescription="Kelas akan tampil di sini setelah ditambahkan."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
