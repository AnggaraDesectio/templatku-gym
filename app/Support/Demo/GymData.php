<?php

namespace App\Support\Demo;

/**
 * Data demo Gym & Fitness (OTOTKU): member, kelas, trainer, pembayaran.
 * Kontrak status: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 * Kelas merujuk trainer; pembayaran merujuk member lewat ID mentah.
 */
class GymData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    /** Baris mentah trainer (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function trainerRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'Rizky Pratama',  'spesialisasi' => 'Strength & Bodybuilding', 'rating' => 4.9, 'telepon' => '0812-3456-7890'],
            ['id' => 2, 'nama' => 'Sinta Maharani', 'spesialisasi' => 'Yoga & Pilates',           'rating' => 4.8, 'telepon' => '0813-2345-6789'],
            ['id' => 3, 'nama' => 'Dimas Angga',    'spesialisasi' => 'HIIT & Cardio',            'rating' => 4.7, 'telepon' => '0815-6789-0123'],
            ['id' => 4, 'nama' => 'Dewi Lestari',   'spesialisasi' => 'Zumba & Aerobic',          'rating' => 4.9, 'telepon' => '0816-5432-1098'],
            ['id' => 5, 'nama' => 'Budi Santoso',   'spesialisasi' => 'Crossfit & Functional',    'rating' => 4.6, 'telepon' => '0817-1234-5678'],
        ];
    }

    /** Baris mentah jadwal kelas: merujuk trainer_id. */
    private static function kelasRows(): array
    {
        return [
            ['id' => 1,  'nama' => 'Morning Yoga',  'trainer_id' => 2, 'hari' => 'Senin',  'jam' => '06:30', 'kapasitas' => 20, 'terisi' => 16],
            ['id' => 2,  'nama' => 'Zumba Party',   'trainer_id' => 4, 'hari' => 'Senin',  'jam' => '18:00', 'kapasitas' => 30, 'terisi' => 28],
            ['id' => 3,  'nama' => 'HIIT Blast',    'trainer_id' => 3, 'hari' => 'Selasa', 'jam' => '07:00', 'kapasitas' => 15, 'terisi' => 12],
            ['id' => 4,  'nama' => 'Body Pump',     'trainer_id' => 1, 'hari' => 'Selasa', 'jam' => '18:30', 'kapasitas' => 20, 'terisi' => 14],
            ['id' => 5,  'nama' => 'Pilates Core',  'trainer_id' => 2, 'hari' => 'Rabu',   'jam' => '07:00', 'kapasitas' => 15, 'terisi' => 10],
            ['id' => 6,  'nama' => 'Spinning',      'trainer_id' => 3, 'hari' => 'Rabu',   'jam' => '18:00', 'kapasitas' => 18, 'terisi' => 18],
            ['id' => 7,  'nama' => 'Crossfit WOD',  'trainer_id' => 5, 'hari' => 'Kamis',  'jam' => '17:30', 'kapasitas' => 12, 'terisi' => 9],
            ['id' => 8,  'nama' => 'Evening Yoga',  'trainer_id' => 2, 'hari' => 'Kamis',  'jam' => '19:00', 'kapasitas' => 20, 'terisi' => 13],
            ['id' => 9,  'nama' => 'Zumba Toning',  'trainer_id' => 4, 'hari' => 'Jumat',  'jam' => '18:00', 'kapasitas' => 30, 'terisi' => 25],
            ['id' => 10, 'nama' => 'Strength 101',  'trainer_id' => 1, 'hari' => 'Sabtu',  'jam' => '09:00', 'kapasitas' => 15, 'terisi' => 11],
        ];
    }

    private static function statusMember(string $key): array
    {
        return match ($key) {
            'aktif'      => ['label' => 'Aktif',           'tone' => 'success'],
            'akan_habis' => ['label' => 'Segera Berakhir', 'tone' => 'warning'],
            'nonaktif'   => ['label' => 'Nonaktif',        'tone' => 'destructive'],
            default      => ['label' => $key,              'tone' => 'info'],
        };
    }

    private static function statusBayar(string $key): array
    {
        return match ($key) {
            'lunas'       => ['label' => 'Lunas',        'tone' => 'success'],
            'jatuh_tempo' => ['label' => 'Jatuh Tempo',  'tone' => 'warning'],
            'telat'       => ['label' => 'Terlambat',    'tone' => 'destructive'],
            default       => ['label' => $key,           'tone' => 'info'],
        };
    }

    /** Baris mentah member gym. */
    private static function memberRows(): array
    {
        return [
            ['id' => 1,  'nama' => 'Andi Wijaya',    'paket' => 'Tahunan', 'tgl_mulai' => '01 Jan 2026', 'tgl_berakhir' => '31 Des 2026', 'status' => 'aktif',      'telepon' => '0812-1111-2222'],
            ['id' => 2,  'nama' => 'Budi Hartono',   'paket' => 'Bulanan', 'tgl_mulai' => '15 Sep 2026', 'tgl_berakhir' => '14 Okt 2026', 'status' => 'akan_habis', 'telepon' => '0813-3333-4444'],
            ['id' => 3,  'nama' => 'Cahyo Ramadhan', 'paket' => 'Premium', 'tgl_mulai' => '01 Mar 2026', 'tgl_berakhir' => '28 Feb 2027', 'status' => 'aktif',      'telepon' => '0815-5555-6666'],
            ['id' => 4,  'nama' => 'Dedi Kurniawan', 'paket' => 'Bulanan', 'tgl_mulai' => '20 Sep 2026', 'tgl_berakhir' => '19 Okt 2026', 'status' => 'akan_habis', 'telepon' => '0816-7777-8888'],
            ['id' => 5,  'nama' => 'Eko Prasetyo',   'paket' => 'Tahunan', 'tgl_mulai' => '10 Jun 2026', 'tgl_berakhir' => '09 Jun 2027', 'status' => 'aktif',      'telepon' => '0817-9999-0000'],
            ['id' => 6,  'nama' => 'Fajar Hidayat',  'paket' => 'Bulanan', 'tgl_mulai' => '01 Agu 2026', 'tgl_berakhir' => '31 Agu 2026', 'status' => 'nonaktif',   'telepon' => '0821-1234-5678'],
            ['id' => 7,  'nama' => 'Gilang Saputra', 'paket' => 'Premium', 'tgl_mulai' => '05 Jul 2026', 'tgl_berakhir' => '04 Jul 2027', 'status' => 'aktif',      'telepon' => '0822-2345-6789'],
            ['id' => 8,  'nama' => 'Hendra Gunawan', 'paket' => 'Bulanan', 'tgl_mulai' => '25 Sep 2026', 'tgl_berakhir' => '24 Okt 2026', 'status' => 'akan_habis', 'telepon' => '0823-3456-7890'],
            ['id' => 9,  'nama' => 'Irwan Setiawan', 'paket' => 'Tahunan', 'tgl_mulai' => '12 Feb 2026', 'tgl_berakhir' => '11 Feb 2027', 'status' => 'aktif',      'telepon' => '0821-4567-8901'],
            ['id' => 10, 'nama' => 'Jaka Pratama',   'paket' => 'Bulanan', 'tgl_mulai' => '01 Jul 2026', 'tgl_berakhir' => '31 Jul 2026', 'status' => 'nonaktif',   'telepon' => '0822-5678-9012'],
            ['id' => 11, 'nama' => 'Kurniawan Adi',  'paket' => 'Premium', 'tgl_mulai' => '18 Agu 2026', 'tgl_berakhir' => '17 Agu 2027', 'status' => 'aktif',      'telepon' => '0822-3456-7890'],
            ['id' => 12, 'nama' => 'Lukman Hakim',   'paket' => 'Bulanan', 'tgl_mulai' => '02 Okt 2026', 'tgl_berakhir' => '01 Nov 2026', 'status' => 'aktif',      'telepon' => '0821-3456-1234'],
        ];
    }

    /** Baris mentah pembayaran: merujuk member_id. */
    private static function pembayaranRows(): array
    {
        return [
            ['id' => 1,  'member_id' => 1,  'periode' => 'Okt 2026', 'jumlah' => 1500000, 'status' => 'lunas',       'tanggal' => '01 Okt 2026'],
            ['id' => 2,  'member_id' => 2,  'periode' => 'Sep 2026', 'jumlah' => 150000,  'status' => 'jatuh_tempo', 'tanggal' => '15 Sep 2026'],
            ['id' => 3,  'member_id' => 3,  'periode' => 'Okt 2026', 'jumlah' => 3500000, 'status' => 'lunas',       'tanggal' => '03 Okt 2026'],
            ['id' => 4,  'member_id' => 4,  'periode' => 'Sep 2026', 'jumlah' => 150000,  'status' => 'telat',       'tanggal' => '20 Sep 2026'],
            ['id' => 5,  'member_id' => 5,  'periode' => 'Okt 2026', 'jumlah' => 1500000, 'status' => 'lunas',       'tanggal' => '05 Okt 2026'],
            ['id' => 6,  'member_id' => 7,  'periode' => 'Okt 2026', 'jumlah' => 3500000, 'status' => 'lunas',       'tanggal' => '06 Okt 2026'],
            ['id' => 7,  'member_id' => 8,  'periode' => 'Sep 2026', 'jumlah' => 150000,  'status' => 'jatuh_tempo', 'tanggal' => '25 Sep 2026'],
            ['id' => 8,  'member_id' => 9,  'periode' => 'Okt 2026', 'jumlah' => 1500000, 'status' => 'lunas',       'tanggal' => '07 Okt 2026'],
            ['id' => 9,  'member_id' => 11, 'periode' => 'Okt 2026', 'jumlah' => 3500000, 'status' => 'lunas',       'tanggal' => '02 Okt 2026'],
            ['id' => 10, 'member_id' => 12, 'periode' => 'Okt 2026', 'jumlah' => 150000,  'status' => 'lunas',       'tanggal' => '02 Okt 2026'],
        ];
    }

    /** Trainer + jumlah kelas yang diampu. */
    public static function trainers(): array
    {
        $kelas = [];
        foreach (self::kelasRows() as $k) {
            $kelas[$k['trainer_id']] = ($kelas[$k['trainer_id']] ?? 0) + 1;
        }

        return array_map(fn ($t) => [
            'id'           => $t['id'],
            'nama'         => $t['nama'],
            'spesialisasi' => $t['spesialisasi'],
            'rating'       => $t['rating'],
            'telepon'      => $t['telepon'],
            'jumlah_kelas' => $kelas[$t['id']] ?? 0,
        ], self::trainerRows());
    }

    /** Jadwal kelas diperkaya nama trainer + sisa slot. */
    public static function kelases(): array
    {
        $trainers = [];
        foreach (self::trainerRows() as $t) {
            $trainers[$t['id']] = $t;
        }

        return array_map(function ($k) use ($trainers) {
            $sisa = $k['kapasitas'] - $k['terisi'];
            return [
                'id'         => $k['id'],
                'nama'       => $k['nama'],
                'trainer'    => $trainers[$k['trainer_id']]['nama'],
                'hari'       => $k['hari'],
                'jam'        => $k['jam'],
                'kapasitas'  => $k['kapasitas'],
                'terisi'     => $k['terisi'],
                'slot_teks'  => $k['terisi'].'/'.$k['kapasitas'],
                'status'     => $sisa <= 0
                    ? ['label' => 'Penuh', 'tone' => 'destructive']
                    : ($sisa <= 3
                        ? ['label' => 'Hampir Penuh', 'tone' => 'warning']
                        : ['label' => 'Tersedia', 'tone' => 'success']),
            ];
        }, self::kelasRows());
    }

    /** Member + label status. */
    public static function members(): array
    {
        return array_map(fn ($m) => [
            'id'           => $m['id'],
            'nama'         => $m['nama'],
            'paket'        => $m['paket'],
            'tgl_mulai'    => $m['tgl_mulai'],
            'tgl_berakhir' => $m['tgl_berakhir'],
            'telepon'      => $m['telepon'],
            'status'       => self::statusMember($m['status']),
        ], self::memberRows());
    }

    /** Pembayaran diperkaya nama member. */
    public static function pembayarans(): array
    {
        $members = [];
        foreach (self::memberRows() as $m) {
            $members[$m['id']] = $m;
        }

        return array_map(function ($p) use ($members) {
            return [
                'id'       => $p['id'],
                'member'   => $members[$p['member_id']]['nama'],
                'paket'    => $members[$p['member_id']]['paket'],
                'periode'  => $p['periode'],
                'jumlah'   => $p['jumlah'],
                'jumlah_rp'=> self::rp($p['jumlah']),
                'tanggal'  => $p['tanggal'],
                'status'   => self::statusBayar($p['status']),
            ];
        }, self::pembayaranRows());
    }

    /** Ringkasan angka dashboard (dihitung dari data). */
    public static function ringkasan(): array
    {
        $members = self::memberRows();
        $aktif   = count(array_filter($members, fn ($m) => $m['status'] === 'aktif'));
        $kelasHariIni = count(array_filter(self::kelasRows(), fn ($k) => $k['hari'] === 'Kamis'));
        $bayar = self::pembayaranRows();
        $jatuhTempo = count(array_filter($bayar, fn ($p) => in_array($p['status'], ['jatuh_tempo', 'telat'], true)));
        $omzet = array_sum(array_map(
            fn ($p) => $p['status'] === 'lunas' ? $p['jumlah'] : 0,
            $bayar
        ));

        return [
            'member_aktif'           => $aktif,
            'kelas_hari_ini'         => $kelasHariIni,
            'pembayaran_jatuh_tempo' => $jatuhTempo,
            'omzet'                  => $omzet,
            'omzet_rp'               => self::rp($omzet),
        ];
    }

    /** Kunjungan member per hari untuk bar chart. */
    public static function kunjunganPerHari(): array
    {
        return [
            'labels'   => ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            'datasets' => [['label' => 'Kunjungan', 'data' => [120, 150, 135, 160, 145, 90, 60]]],
        ];
    }

    /** Distribusi paket member untuk donut chart. */
    public static function distribusiPaket(): array
    {
        $keys = ['Bulanan' => 'Bulanan', 'Tahunan' => 'Tahunan', 'Premium' => 'Premium'];
        $labels = [];
        $data   = [];
        foreach ($keys as $key => $label) {
            $labels[] = $label;
            $data[]   = count(array_filter(self::memberRows(), fn ($m) => $m['paket'] === $key));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Member', 'data' => $data]],
        ];
    }

    /** Omzet (juta Rp) per bulan untuk area chart. */
    public static function omzetPerBulan(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Omzet (juta Rp)', 'data' => [9, 12, 14, 11, 15, 16]]],
        ];
    }

    /** Papan peringkat trainer: kelas diampu + total peserta + rating. */
    public static function trainerLeaderboard(): array
    {
        $agg = [];
        foreach (self::trainerRows() as $t) {
            $agg[$t['id']] = [
                'trainer'      => $t['nama'],
                'spesialisasi' => $t['spesialisasi'],
                'rating'       => $t['rating'],
                'kelas'        => 0,
                'peserta'      => 0,
            ];
        }
        foreach (self::kelasRows() as $k) {
            $agg[$k['trainer_id']]['kelas']++;
            $agg[$k['trainer_id']]['peserta'] += $k['terisi'];
        }
        usort($agg, fn ($a, $b) => $b['peserta'] <=> $a['peserta']);

        return array_values($agg);
    }
}
