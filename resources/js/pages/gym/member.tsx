import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

interface Member {
    id: number;
    nama: string;
    paket: string;
    tgl_mulai: string;
    tgl_berakhir: string;
    telepon: string;
    status: ToneLabel;
}

const PAKET = ['Bulanan', 'Tahunan', 'Premium'];

const memberStatus = (tglBerakhir: string): ToneLabel => {
    const diff = new Date(tglBerakhir).getTime() - Date.now();
    if (Number.isNaN(diff) || diff < 0) return { label: 'Nonaktif', tone: 'info' };
    if (diff < 7 * 24 * 3600 * 1000) return { label: 'Segera Berakhir', tone: 'warning' };
    return { label: 'Aktif', tone: 'success' };
};

export default function GymMember({ members }: { members: Record<string, any>[] }) {
    const [rows, setRows] = useState<Member[]>(
        members.map((m) => ({
            id: Number(m.id),
            nama: String(m.nama),
            paket: String(m.paket),
            tgl_mulai: String(m.tgl_mulai),
            tgl_berakhir: String(m.tgl_berakhir),
            telepon: String(m.telepon),
            status: m.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Member | null>(null);
    const [nama, setNama] = useState('');
    const [paket, setPaket] = useState('Bulanan');
    const [tglMulai, setTglMulai] = useState('');
    const [durasi, setDurasi] = useState('1');
    const [telepon, setTelepon] = useState('');

    const openAdd = () => {
        setEditing(null);
        setNama('');
        setPaket('Bulanan');
        setTglMulai(new Date().toISOString().slice(0, 10));
        setDurasi('1');
        setTelepon('');
        setOpen(true);
    };

    const openEdit = (row: Member) => {
        setEditing(row);
        setNama(row.nama);
        setPaket(row.paket);
        setTglMulai(row.tgl_mulai);
        setDurasi('1');
        setTelepon(row.telepon);
        setOpen(true);
    };

    const hitungBerakhir = (mulai: string, bulan: number) => {
        const d = new Date(mulai);
        d.setMonth(d.getMonth() + bulan);
        return d.toISOString().slice(0, 10);
    };

    const simpan = () => {
        if (!nama.trim() || !tglMulai) {
            toast.error('Lengkapi nama member dan tanggal mulai.');
            return;
        }
        const bulan = paket === 'Tahunan' ? 12 : Math.max(1, Number(durasi) || 1);
        const tglBerakhir = hitungBerakhir(tglMulai, bulan);
        const payload = {
            nama: nama.trim(),
            paket,
            tgl_mulai: tglMulai,
            tgl_berakhir: tglBerakhir,
            telepon: telepon.trim() || '-',
            status: memberStatus(tglBerakhir),
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`Data ${nama.trim()} diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [{ id, ...payload }, ...rs]);
            toast.success(`${nama.trim()} terdaftar, aktif sampai ${tglBerakhir}.`);
        }
        setOpen(false);
    };

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
        { key: 'tgl_mulai', header: 'Mulai', mobileHidden: true, sortValue: (r) => r.tgl_mulai },
        { key: 'tgl_berakhir', header: 'Berakhir', sortValue: (r) => r.tgl_berakhir },
        { key: 'telepon', header: 'Telepon', mobileHidden: true },
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
                { value: 'Aktif', label: 'Aktif' },
                { value: 'Segera Berakhir', label: 'Segera Berakhir' },
                { value: 'Nonaktif', label: 'Nonaktif' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
        {
            key: 'paket',
            label: 'Paket',
            options: [
                { value: 'Bulanan', label: 'Bulanan' },
                { value: 'Tahunan', label: 'Tahunan' },
                { value: 'Premium', label: 'Premium' },
            ],
            match: (row: any, value: string) => row.paket === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Member"
                description="Siapa saja yang latihan di sini, pantau masa berlaku biar tidak kecolongan."
                breadcrumbs={[{ label: 'Gym', href: '/gym' }, { label: 'Member' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Member
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Member</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'paket']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada member"
                        emptyDescription="Daftarkan member pertama lewat tombol Tambah Member, masa aktif dihitung otomatis."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Member' : 'Member Baru'}</DialogTitle>
                        <DialogDescription>
                            Daftarkan member, tanggal berakhir dihitung otomatis dari paketnya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="mbr-nama">Nama member</Label>
                            <Input
                                id="mbr-nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="cth. Rizky Pratama"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mbr-paket">Paket</Label>
                            <Select value={paket} onValueChange={setPaket}>
                                <SelectTrigger id="mbr-paket">
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
                            <Label htmlFor="mbr-telp">Telepon</Label>
                            <Input
                                id="mbr-telp"
                                inputMode="tel"
                                value={telepon}
                                onChange={(e) => setTelepon(e.target.value)}
                                placeholder="08xx…"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mbr-mulai">Tanggal mulai</Label>
                            <Input
                                id="mbr-mulai"
                                type="date"
                                value={tglMulai}
                                onChange={(e) => setTglMulai(e.target.value)}
                            />
                        </div>
                        {paket === 'Bulanan' && (
                            <div className="space-y-2">
                                <Label htmlFor="mbr-durasi">Durasi (bulan)</Label>
                                <Input
                                    id="mbr-durasi"
                                    inputMode="numeric"
                                    value={durasi}
                                    onChange={(e) => setDurasi(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Daftarkan Member'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
