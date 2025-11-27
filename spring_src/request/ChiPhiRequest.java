package com.example.demo.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiPhiRequest {	
    private java.math.BigDecimal chiPhiMacDinh;    
    private String tenTk;   
    private String soTk;  
    private String nganHang;
    private String qrCode;
}

