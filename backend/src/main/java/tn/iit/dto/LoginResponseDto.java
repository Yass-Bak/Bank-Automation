package tn.iit.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Getter
@Data
public class LoginResponseDto {
    private String accessToken;
}
