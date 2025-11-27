package com.example.demo.service;

import com.example.demo.entity.HocPhan;
import com.example.demo.entity.Khoa;
import com.example.demo.entity.VaiTroPhuTrach;
import com.example.demo.repository.HocPhanRepository;
import com.example.demo.repository.KhoaRepository;
// Bạn cần tạo repository này nếu chưa có
import com.example.demo.repository.VaiTroPhuTrachRepository; 
import com.example.demo.request.HocPhanRequest;
import com.example.demo.response.HocPhanDetailResponse;
import com.example.demo.response.HocPhanResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HocPhanService {

    @Autowired
    private HocPhanRepository hocPhanRepo;
    @Autowired
    private KhoaRepository khoaRepo;
    @Autowired
    private VaiTroPhuTrachRepository vaiTroRepo; 

    // 1. TÌM KIẾM
    public List<HocPhanResponse> search(String keyword, Long khoaId, String loaiHp, String trangThai) {
        return hocPhanRepo.searchHocPhan(keyword, khoaId, loaiHp, trangThai).stream()
                .map(hp -> new HocPhanResponse(
                        hp.getId(),
                        hp.getMaHp(),
                        hp.getTenHp(),
                        (hp.getKhoa() != null) ? hp.getKhoa().getTenKhoa() : "",
                        hp.getLoaiHp(),
                        hp.getSoTinChi(),
                        (hp.getNguoiPhuTrach() != null && hp.getNguoiPhuTrach().getGiangVien() != null) 
                             ? hp.getNguoiPhuTrach().getGiangVien().getHoTen() : "Chưa có",
                        hp.getTrangThai()
                )).collect(Collectors.toList());
    }

    // 2. XEM CHI TIẾT
    public HocPhanDetailResponse getDetail(Long id) {
        HocPhan hp = hocPhanRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Học phần không tồn tại"));

        Long khoaId = (hp.getKhoa() != null) ? hp.getKhoa().getId() : null;
        String tenKhoa = (hp.getKhoa() != null) ? hp.getKhoa().getTenKhoa() : "";
        Long ptId = (hp.getNguoiPhuTrach() != null) ? hp.getNguoiPhuTrach().getId() : null;
        String tenPt = (hp.getNguoiPhuTrach() != null && hp.getNguoiPhuTrach().getGiangVien() != null) 
                       ? hp.getNguoiPhuTrach().getGiangVien().getHoTen() : "";

        return new HocPhanDetailResponse(
                hp.getId(), hp.getMaHp(), hp.getTenHp(), hp.getSoTinChi(),
                hp.getLoaiHp(), hp.getTrangThai(), khoaId, tenKhoa, ptId, tenPt
        );
    }

    // 3. THÊM MỚI
    public void create(HocPhanRequest req) {
        if (hocPhanRepo.existsByMaHp(req.getMaHp())) {
            throw new RuntimeException("Mã học phần đã tồn tại!");
        }
        HocPhan hp = new HocPhan();
        hp.setMaHp(req.getMaHp());
        mapRequestToEntity(hp, req);
        hocPhanRepo.save(hp);
    }

    // 4. CẬP NHẬT
    public void update(Long id, HocPhanRequest req) {
        HocPhan hp = hocPhanRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Học phần không tồn tại"));
        mapRequestToEntity(hp, req);
        hocPhanRepo.save(hp);
    }

    // 5. XÓA (Soft Delete)
    public void delete(Long id) {
        HocPhan hp = hocPhanRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Học phần không tồn tại"));
        hp.setTrangThai("DA_XOA");
        hocPhanRepo.save(hp);
    }

    // Hàm phụ trợ để map dữ liệu
    private void mapRequestToEntity(HocPhan hp, HocPhanRequest req) {
        hp.setTenHp(req.getTenHp());
        hp.setSoTinChi(req.getSoTinChi());
        hp.setLoaiHp(req.getLoaiHp());
        hp.setTrangThai(req.getTrangThai());

        if (req.getKhoaId() != null) {
            Khoa khoa = khoaRepo.findById(req.getKhoaId())
                    .orElseThrow(() -> new RuntimeException("Khoa không tồn tại"));
            hp.setKhoa(khoa);
        }

        if (req.getNguoiPhuTrachId() != null) {
            VaiTroPhuTrach vaiTro = vaiTroRepo.findById(req.getNguoiPhuTrachId())
                    .orElseThrow(() -> new RuntimeException("Người phụ trách không tồn tại"));
            hp.setNguoiPhuTrach(vaiTro);
        }
    }
}