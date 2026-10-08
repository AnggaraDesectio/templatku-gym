import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Star } from 'lucide-react';

interface Trainer {
    id: number;
    nama: string;
    spesialisasi: string;
    rating: number;
    telepon: string;
    jumlah_kelas: number;
}

export default function GymTrainer({ trainers }: { trainers: Record<string, any>[] }) {
    const rows: Trainer[] = trainers.map((t) => ({
        id: Number(t.id),
        nama: String(t.nama),
        spesialisasi: String(t.spesialisasi),
        rating: Number(t.rating),
        telepon: String(t.telepon),
        jumlah_kelas: Number(t.jumlah_kelas),
    }));

    const columns: Column<Trainer>[] = [
        {
            key: 'nama',
            header: 'Trainer',
            render: (r) => (
                <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {r.nama.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{r.nama}</span>
                </div>
            ),
            sortValue: (r) => r.nama,
        },
        { key: 'spesialisasi', header: 'Spesialisasi', sortValue: (r) => r.spesialisasi },
        {
            key: 'rating',
            header: 'Rating',
            render: (r) => (
                <span className="inline-flex items-center gap-1 font-medium">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {r.rating.toFixed(1)}
                </span>
            ),
            sortValue: (r) => r.rating,
        },
        { key: 'telepon', header: 'Telepon', mobileHidden: true },
        {
            key: 'jumlah_kelas',
            header: 'Kelas / Minggu',
            render: (r) => <span className="tnum font-medium">{r.jumlah_kelas}</span>,
            sortValue: (r) => r.jumlah_kelas,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Trainer"
                description="Daftar personal trainer beserta spesialisasi dan rating member."
                breadcrumbs={[{ label: 'Gym', href: '/gym' }, { label: 'Trainer' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Trainer</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'spesialisasi']}
                        pageSize={10}
                        emptyTitle="Belum ada trainer"
                        emptyDescription="Trainer akan tampil di sini setelah ditambahkan."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
