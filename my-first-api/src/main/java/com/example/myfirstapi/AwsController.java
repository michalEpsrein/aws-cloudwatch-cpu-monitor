package com.example.myfirstapi;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.services.cloudwatch.model.GetMetricStatisticsResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AwsController {

    @Autowired
    private AwsService awsService;

    @GetMapping("/cpu")
    public List<CpuDataDTO> getCpuUsage(
            @RequestParam String instanceId,
            @RequestParam(defaultValue = "60") int minutes) {

        // מימוש הסעיף של מניעת טרמינציה
        awsService.setTerminationProtection(instanceId, true);

        int period = (minutes > 180) ? 300 : 60;
        GetMetricStatisticsResponse response = awsService.getCpuUsage(instanceId, minutes, period);

        return response.datapoints().stream()
                .map(dp -> new CpuDataDTO(dp.timestamp().toString(), dp.average()))
                .toList();
    }
}
