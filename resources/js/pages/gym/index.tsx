import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, CircleAlert, Users, Wallet, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Member {
    id: number;
    nama: string;
    paket: string;
    tgl_berakhir: string;
    status: ToneLabel;
}

interface Ringkasan {
    member_aktif: number;
    kelas_hari_ini: number;
    pembayaran_jatuh_tempo: number;
    omzet_rp: string;
}

export default function GymIndex({
    ringkasan,
    chart,
    members,
}: {
    ringkasan: Ringkasan;
    chart: ChartData;
    members: Record<string, any>[];
}) {
    const rows: Member[] = members.map((m) => ({
        id: Number(m.id),
        nama: String(m.nama),
        paket: String(m.paket),
        tgl_berakhir: String(m.tgl_berakhir),
        status: m.status as ToneLabel,
    }));

    const columns: Column<Member>[] = [
        {
            key: 'nama',
            header: 'Member',
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
        { key: 'paket', header: 'Paket', sortValue: (r) => r.paket },
        { key: 'tgl_berakhir', header: 'Berakhir', sortValue: (r) => r.tgl_berakhir },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Dashboard"
                description="Ringkasan operasional gym OTOTKU: member, kelas, dan pembayaran."
                breadcrumbs={[{ label: 'Gym' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/gym/member">
                            <UserPlus className="mr-2 h-4 w-4" /> Member Baru
                        </Link>
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Member Aktif"
                    value={String(ringkasan.member_aktif)}
                    delta="keanggotaan berjalan"
                    trend="up"
                    icon={Users}
                    hint="Member dengan paket yang masih berlaku."
                />
                <StatCard
                    label="Kelas Hari Ini"
                    value={String(ringkasan.kelas_hari_ini)}
                    delta="jadwal hari Kamis"
                    trend="flat"
                    icon={CalendarDays}
                    hint="Sesi kelas yang berjalan hari ini."
                />
                <StatCard
                    label="Pembayaran Jatuh Tempo"
                    value={String(ringkasan.pembayaran_jatuh_tempo)}
                    delta="perlu ditagih"
                    trend="down"
                    icon={CircleAlert}
                    hint="Tagihan iuran yang lewat jatuh tempo."
                />
                <StatCard
                    label="Omzet"
                    value={ringkasan.omzet_rp}
                    delta="dari pembayaran lunas"
                    trend="up"
                    icon={Wallet}
                    hint="Iuran yang sudah dibayar member."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Kunjungan Member per Hari</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Rata-rata kunjungan harian minggu ini.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={chart} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Segera Berakhir</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Member yang perlu diingatkan perpanjangan.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {rows
                            .filter((m) => m.status.label === 'Segera Berakhir')
                            .map((m) => (
                                <div key={m.id} className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarFallback className="bg-warning/20 text-warning-foreground text-xs">
                                            {m.nama.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">{m.nama}</p>
                                        <p className="text-muted-foreground truncate text-xs">
                                            {m.paket} · berakhir {m.tgl_berakhir}
                                        </p>
                                    </div>
                                    <ToneBadge label={m.status.label} tone={m.status.tone} />
                                </div>
                            ))}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['nama', 'paket']}
                    emptyTitle="Belum ada member"
                    emptyDescription="Member akan tampil di sini setelah ditambahkan."
                />
            </div>
        </AuthenticatedLayout>
    );
}
