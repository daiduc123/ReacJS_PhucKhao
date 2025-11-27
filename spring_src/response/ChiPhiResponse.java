package com.example.demo.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiPhiResponse {
	private java.math.BigDecimal chiPhiMacDinh;    
    private String tenTk;   
    private String soTk;  
    private String nganHang;
    private String qrCode;
}

