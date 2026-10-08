import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Pembayaran {
    id: number;
    member: string;
    paket: string;
    periode: string;
    jumlah_rp: string;
    tanggal: string;
    status: ToneLabel;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const PAKET = ['Bulanan', 'Tahunan', 'Premium'];
const STATUS_BAYAR = ['Lunas', 'Jatuh Tempo', 'Terlambat'];

const statusTone = (s: string): ToneLabel['tone'] =>
    s === 'Lunas' ? 'success' : s === 'Terlambat' ? 'destructive' : 'warning';

export default function GymPembayaran({ pembayarans }: { pembayarans: Record<string, any>[] }) {
    const [rows, setRows] = useState<Pembayaran[]>(
        pembayarans.map((p) => ({
            id: Number(p.id),
            member: String(p.member),
            paket: String(p.paket),
            periode: String(p.periode),
            jumlah_rp: String(p.jumlah_rp),
            tanggal: String(p.tanggal),
            status: p.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Pembayaran | null>(null);
    const [member, setMember] = useState('');
    const [paket, setPaket] = useState('Bulanan');
    const [periode, setPeriode] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
    const [status, setStatus] = useState('Lunas');

    const openAdd = () => {
        setEditing(null);
        setMember('');
        setPaket('Bulanan');
        setPeriode('');
        setJumlah('');
        setTanggal(new Date().toISOString().slice(0, 10));
        setStatus('Lunas');
        setOpen(true);
    };

    const openEdit = (row: Pembayaran) => {
        setEditing(row);
        setMember(row.member);
        setPaket(row.paket);
        setPeriode(row.periode);
        setJumlah(row.jumlah_rp.replace(/[^0-9]/g, ''));
        setTanggal(row.tanggal);
        setStatus(row.status.label);
        setOpen(true);
    };

    const simpan = () => {
        const jumlahNum = Number(jumlah.replace(/[^0-9]/g, ''));
        if (!member.trim() || !jumlahNum) {
            toast.error('Lengkapi nama member dan jumlah pembayaran.');
            return;
        }
        const payload = {
            member: member.trim(),
            paket,
            periode: periode.trim() || '-',
            jumlah_rp: rupiah(jumlahNum),
            tanggal,
            status: { label: status, tone: statusTone(status) } as ToneLabel,
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success('Catatan pembayaran diperbarui.');
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [{ id, ...payload }, ...rs]);
            toast.success(`Pembayaran ${member.trim()} sebesar ${rupiah(jumlahNum)} tercatat.`);
        }
        setOpen(false);
    };

    const columns: Column<Pembayaran>[] = [
        { key: 'member', header: 'Member', sortValue: (r) => r.member },
        { key: 'paket', header: 'Paket', sortValue: (r) => r.paket },
        { key: 'periode', header: 'Periode', sortValue: (r) => r.periode },
        {
            key: 'jumlah_rp',
            header: 'Jumlah',
            render: (r) => <span className="tnum font-medium">{r.jumlah_rp}</span>,
            sortValue: (r) => r.jumlah_rp,
        },
        { key: 'tanggal', header: 'Tanggal', mobileHidden: true, sortValue: (r) => r.tanggal },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Lunas', label: 'Lunas' },
                { value: 'Jatuh Tempo', label: 'Jatuh Tempo' },
                { value: 'Terlambat', label: 'Terlambat' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Pembayaran"
                description="Uang iuran yang masuk, catat tiap pembayaran biar tidak ada yang kelewat."
                breadcrumbs={[{ label: 'Gym', href: '/gym' }, { label: 'Pembayaran' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Catat Pembayaran
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['member', 'periode']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada pembayaran"
                        emptyDescription="Catat pembayaran pertama lewat tombol Catat Pembayaran."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Pembayaran' : 'Catat Pembayaran'}</DialogTitle>
                        <DialogDescription>
                            Catat iuran yang dibayar member beserta periodenya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                            <Label htmlFor="byr-nama">Nama member</Label>
                            <Input
                                id="byr-nama"
                                value={member}
                                onChange={(e) => setMember(e.target.value)}
                                placeholder="cth. Rizky Pratama"
                            />
                        </div>
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                            <Label htmlFor="byr-paket">Paket</Label>
                            <Select value={paket} onValueChange={setPaket}>
                                <SelectTrigger id="byr-paket">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAKET.map((pk) => (
                                        <SelectItem key={pk} value={pk}>
                                            {pk}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="byr-periode">Periode</Label>
                            <Input
                                id="byr-periode"
                                value={periode}
                                onChange={(e) => setPeriode(e.target.value)}
                                placeholder="cth. Okt 2026"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="byr-jumlah">Jumlah (Rp)</Label>
                            <Input
                                id="byr-jumlah"
                                inputMode="numeric"
                                value={jumlah}
                                onChange={(e) => setJumlah(e.target.value)}
                                placeholder="150000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="byr-tgl">Tanggal bayar</Label>
                            <Input
                                id="byr-tgl"
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="byr-status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="byr-status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_BAYAR.map((st) => (
                                        <SelectItem key={st} value={st}>
                                            {st}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Catat Pembayaran'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
