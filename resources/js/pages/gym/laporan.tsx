import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, CircleAlert, Users, Wallet } from 'lucide-react';

interface Leaderboard {
    trainer: string;
    spesialisasi: string;
    rating: number;
    kelas: number;
    peserta: number;
}

interface Ringkasan {
    member_aktif: number;
    kelas_hari_ini: number;
    pembayaran_jatuh_tempo: number;
    omzet_rp: string;
}

export default function GymLaporan({
    ringkasan,
    kunjungan,
    distribusi,
    perBulan,
    leaderboard,
}: {
    ringkasan: Ringkasan;
    kunjungan: ChartData;
    distribusi: ChartData;
    perBulan: ChartData;
    leaderboard: Record<string, any>[];
}) {
    const rows: Leaderboard[] = leaderboard.map((l) => ({
        trainer: String(l.trainer),
        spesialisasi: String(l.spesialisasi),
        rating: Number(l.rating),
        kelas: Number(l.kelas),
        peserta: Number(l.peserta),
    }));

    const columns: Column<Leaderboard & { id: number }>[] = [
        { key: 'trainer', header: 'Trainer', sortValue: (r) => r.trainer },
        { key: 'spesialisasi', header: 'Spesialisasi', mobileHidden: true, sortValue: (r) => r.spesialisasi },
        {
            key: 'rating',
            header: 'Rating',
            render: (r) => <span className="tnum font-medium">{r.rating.toFixed(1)}</span>,
            sortValue: (r) => r.rating,
        },
        {
            key: 'kelas',
            header: 'Kelas',
            render: (r) => <span className="tnum font-medium">{r.kelas}</span>,
            sortValue: (r) => r.kelas,
        },
        {
            key: 'peserta',
            header: 'Total Peserta',
            render: (r) => <span className="tnum font-medium">{r.peserta}</span>,
            sortValue: (r) => r.peserta,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Analisis kunjungan, omzet, paket member, dan performa trainer."
                breadcrumbs={[{ label: 'Gym', href: '/gym' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Member Aktif" value={String(ringkasan.member_aktif)} delta="keanggotaan berjalan" trend="up" icon={Users} hint="Member dengan paket masih berlaku." />
                <StatCard label="Kelas Hari Ini" value={String(ringkasan.kelas_hari_ini)} delta="jadwal hari Kamis" trend="flat" icon={CalendarDays} hint="Sesi kelas yang berjalan hari ini." />
                <StatCard label="Pembayaran Jatuh Tempo" value={String(ringkasan.pembayaran_jatuh_tempo)} delta="perlu ditagih" trend="down" icon={CircleAlert} hint="Tagihan iuran yang lewat jatuh tempo." />
                <StatCard label="Omzet" value={ringkasan.omzet_rp} delta="dari pembayaran lunas" trend="up" icon={Wallet} hint="Total iuran yang sudah dibayar." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Omzet per Bulan</CardTitle>
                        <p className="text-muted-foreground text-sm">Omzet pembayaran dalam juta rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={perBulan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Kunjungan per Hari</CardTitle>
                        <p className="text-muted-foreground text-sm">Rata-rata kunjungan member harian.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={kunjungan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Distribusi Paket Member</CardTitle>
                        <p className="text-muted-foreground text-sm">Komposisi paket keanggotaan.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows.map((r, i) => ({ ...r, id: i }))}
                    searchKeys={['trainer', 'spesialisasi']}
                    emptyTitle="Belum ada data"
                    emptyDescription="Data performa trainer akan tampil di sini."
                />
            </div>
        </AuthenticatedLayout>
    );
}
